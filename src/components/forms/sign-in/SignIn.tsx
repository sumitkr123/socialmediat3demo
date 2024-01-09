"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginValidationSchema } from "@/lib/validations/LoginValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LiteralUnion, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const SignIn = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}): React.ReactNode => {
  const form = useForm<z.infer<typeof LoginValidationSchema>>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof LoginValidationSchema>) => {
    setIsSubmitting(true);

    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error !== null && signInData?.error) {
      toast("Invalid credentials found..!", {
        position: "top-right",
        duration: 1500,
      });
    } else {
      router.replace("/");
    }
    setIsSubmitting(false);
  };

  const handleSocialLogin = async (
    authkey: LiteralUnion<BuiltInProviderType, string>,
  ) => {
    const signInData = await signIn(authkey, {
      callbackUrl: "/",
      redirect: true,
    });

    if (signInData?.error !== null && signInData?.error) {
      toast(signInData?.error, { position: "top-right", duration: 1500 });
    }
  };

  const _renderFormByProviders = () => {
    if (providers !== null && providers) {
      return Object.keys(providers).map(
        (authkey: LiteralUnion<BuiltInProviderType, string>, index) => {
          switch (authkey) {
            case "credentials":
              return (
                <div key={authkey}>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="mt-10 flex flex-col justify-start gap-6"
                    >
                      <FormField
                        required
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="text-base-semibold text-dark-1">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className="input-focus"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        required
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="text-base-semibold text-dark-1">
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter your password"
                                className="input-focus"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="bg-primary text-white"
                      >
                        Submit
                      </Button>
                    </form>

                    <Link
                      replace
                      href={"/auth/sign-up"}
                      className="text-md mt-5 flex w-fit gap-2 text-slate-700"
                    >
                      No account?&nbsp;
                      <p className="text-md text-primary">Sign up</p>
                    </Link>

                    <div className="my-4 flex flex-row items-center gap-2">
                      <div className="flex h-[0.5px] w-full bg-dark-1" />
                      <p className="text-md text-slate-700">OR</p>
                      <div className="flex h-[0.5px] w-full bg-dark-1" />
                    </div>
                  </Form>
                </div>
              );

            case "discord":
              return (
                <Button
                  key={authkey}
                  disabled={isSubmitting}
                  className="flex gap-5 bg-dark-1 text-light-1 hover:bg-gray-800"
                  onClick={() => handleSocialLogin(authkey)}
                >
                  <Image
                    alt="Discord Logo"
                    src={"/assets/discord.png"}
                    width={20}
                    height={20}
                  />
                  Sign in with Discord
                </Button>
              );

            default:
              return <></>;
          }
        },
      );
    }
  };

  return (
    <div className="no-scrollbar flex h-2/3 flex-col justify-between overflow-auto rounded-xl bg-white px-11 py-10">
      <div className="flex flex-col justify-start self-start">
        <p className="text-pretty text-xl text-dark-1">Sign in</p>
        <p className="text-sm text-slate-600">
          to continue to this application
        </p>
      </div>

      {_renderFormByProviders()}
    </div>
  );
};

export default SignIn;
