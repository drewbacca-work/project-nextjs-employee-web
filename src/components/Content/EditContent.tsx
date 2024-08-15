"use client";

import { IApiUserInterface } from "@/interfaces/api.user.interface";
import { apiUserStore } from "@/stores/api.user.store";
import { commonStore } from "@/stores/common.store";
import { headerStore } from "@/stores/header.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function EditContent({
  userId,
  labels,
}: {
  userId: number;
  labels: any;
}) {
  const router = useRouter();

  const userList: Array<IApiUserInterface> = apiUserStore(
    (state: any) => state.userList
  );
  const locale = commonStore((state: any) => state.locale);
  const setUserList = apiUserStore((state: any) => state.setUserList);
  const setCurrentIndex = headerStore((state: any) => state.setCurrentIndex);
  const setPathName = headerStore((state: any) => state.setPathName);

  const [userData, setUserData] = useState<IApiUserInterface | null>(null);

  // Update the screen index and pathname
  setCurrentIndex(1);
  setPathName("/edit");

  function onUploadClick(e: ChangeEvent<HTMLInputElement>) {
    setUserData({
      ...(userData as IApiUserInterface),
      avatar: e?.target?.files ? URL.createObjectURL(e?.target?.files[0]) : "",
    });
  }

  function onSubmitClick() {
    const arrayIndex = userList.findIndex((obj) => obj.id == userId);
    const tmpUserList = [...userList];
    tmpUserList[arrayIndex] = userData as IApiUserInterface;
    setUserList(tmpUserList);

    setCurrentIndex(2);
    setPathName(`/view`);
    router.push(`${locale}/view`);
  }

  useEffect(() => {
    setUserData(userList.filter((user) => user.id == userId)[0]);
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-evenly items-center flex-col h-full">
        {labels.noFound}
      </div>
    );
  }

  return (
    <div className="flex justify-evenly items-center flex-col h-full">
      {userData.avatar ? (
        <Image
          src={userData.avatar}
          alt={""}
          width={200}
          height={200}
          className="aspect-[16/8] md:aspect-[1.5] rounded-2xl"
          loading="lazy"
          style={{ objectFit: "cover" }}
          unoptimized
        />
      ) : (
        <div className="aspect-[16/8] md:aspect-[1.5] rounded-2xl bg-blue-200 w-[200px] h-[100px]" />
      )}
      <input
        id="id_upload_image"
        type="file"
        onChange={(e) => onUploadClick(e)}
      />
      <div>
        <div>{labels.firstName}</div>
        <input
          className="border-black border-2 rounded-md p-1"
          type="text"
          value={userData.first_name}
          onChange={(e) => {
            setUserData({
              ...userData,
              first_name: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <div>{labels.lastName}</div>
        <input
          className="border-black border-2 rounded-md p-1"
          type="text"
          value={userData.last_name}
          onChange={(e) => {
            setUserData({
              ...userData,
              last_name: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <div>{labels.salary}</div>
        <input
          className="border-black border-2 rounded-md p-1"
          type="number"
          value={userData.salary}
          onChange={(e) => {
            setUserData({
              ...userData,
              salary: Number(e.target.value),
            });
          }}
          onKeyDown={(e) =>
            (e.key === "." || e.key === ",") && e.preventDefault()
          }
        />
      </div>
      <div>
        <div>{labels.age}</div>
        <input
          className="border-black border-2 rounded-md p-1"
          type="number"
          value={userData.age}
          onChange={(e) => {
            setUserData({
              ...userData,
              age: Number(e.target.value),
            });
          }}
          onKeyDown={(e) =>
            (e.key === "." || e.key === "," || e.key === "-") &&
            e.preventDefault()
          }
        />
      </div>
      <button
        className="rounded-md py-1 px-4 bg-blue-500 text-white min-w-[180px]"
        onClick={onSubmitClick}
      >
        {labels.submit}
      </button>
    </div>
  );
}
