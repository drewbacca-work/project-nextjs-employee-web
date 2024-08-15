"use client";

import { apiUserStore } from "@/stores/api.user.store";
import { commonStore } from "@/stores/common.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const locale = commonStore((state: any) => state.locale);
  const setUserList = apiUserStore((state: any) => state.setUserList);

  async function onCallApi() {
    try {
      const res = await fetch(`https://reqres.in/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserList(data?.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    onCallApi();

    router.push(`/${locale}/add`);
  }, []);

  return <div></div>;
}
