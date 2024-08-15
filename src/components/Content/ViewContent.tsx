"use client";

import { IApiUserInterface } from "@/interfaces/api.user.interface";
import { apiUserStore } from "@/stores/api.user.store";
import { commonStore } from "@/stores/common.store";
import { headerStore } from "@/stores/header.store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ViewContent({ labels }: { labels: any }) {
  const locale = commonStore((state: any) => state.locale);
  const userList: Array<IApiUserInterface> = apiUserStore(
    (state: any) => state.userList
  );
  const setUserList = apiUserStore((state: any) => state.setUserList);
  const setCurrentIndex = headerStore((state: any) => state.setCurrentIndex);
  const setPathName = headerStore((state: any) => state.setPathName);

  // Update the screen index and pathname
  setCurrentIndex(2);
  setPathName("/view");

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
    // If user redirect here, check if the list is empty, then call the API again
    if (!userList || userList.length === 0) {
      onCallApi();
    }
  }, [userList]);

  return (
    <div className="w-full h-full border rounded-md shadow-lg overflow-scroll">
      <table className="table-fixed w-full">
        <thead className="bg-blue-500 text-left">
          <tr>
            <th className="px-4 py-2 text-white w-1/12 font-medium">
              {labels.sn}
            </th>
            <th className="px-4 py-2 text-white w-3/12 font-medium">
              {labels.profile}
            </th>
            <th className="px-4 py-2 text-white w-3/12 font-medium">
              {labels.name}
            </th>
            <th className="px-4 py-2 text-white w-2/12 font-medium">
              {labels.salary}
            </th>
            <th className="px-4 py-2 text-white w-2/12 font-medium">
              {labels.age}
            </th>
            <th className="px-4 py-2 text-white w-1/12 font-medium text-center">
              {labels.action}
            </th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((user, index) => {
              return (
                <tr key={index} className="hover:bg-gray-50 border text-left">
                  <th className="px-4 py-2 font-medium">{index + 1}</th>
                  <th className="px-4 py-2 font-medium">
                    <Image
                      src={user.avatar ?? ""}
                      alt={""}
                      width={100}
                      height={50}
                      className="aspect-[16/8] md:aspect-[1.5] rounded-2xl"
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </th>
                  <th>
                    <div className="px-4 py-2 font-medium truncate max-w-[25ch]">{`${user.first_name} ${user.last_name}`}</div>
                  </th>
                  <th className="px-4 py-2 font-medium">{user.salary}</th>
                  <th className="px-4 py-2 font-medium">{user.age}</th>
                  <th className="px-4 py-2 font-medium text-center">
                    <Link
                      className="text-blue-500"
                      href={{
                        pathname: `/${locale}/edit`,
                        query: {
                          userId: user.id,
                        },
                      }}
                      onClick={() => {
                        setCurrentIndex(1);
                        setPathName(`/edit`);
                      }}
                    >
                      {labels.edit}
                    </Link>
                  </th>
                </tr>
              );
            })}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}
