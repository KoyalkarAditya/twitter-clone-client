"use client";
import { FaXTwitter } from "react-icons/fa6";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useCurrentUser();

  useEffect(() => {
    if (user) {
      redirect("/home");
    }
  }, [user]);

  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error(`Google Token not found`);
      }
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );
      toast.success("Verification Success");
      if (verifyGoogleToken) {
        localStorage.setItem("token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    []
  );

  return (
    <div className="">
      <div className="flex  items-center  justify-center h-screen">
        <div className=" w-[60%] flex items-center justify-center h-screen">
          <FaXTwitter className="logo" />
        </div>
        {!user && (
          <div className=" w-[40%] pr-20">
            <div className=" flex h-screen justify-center items-center flex-col p-5 text-center rounded-lg gap-10 ">
              <h1 className=" text-5xl font-extrabold">New to Twitter/X ?</h1>
              <div className=" flex justify-center w-72">
                <GoogleLogin onSuccess={handleLoginWithGoogle} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
