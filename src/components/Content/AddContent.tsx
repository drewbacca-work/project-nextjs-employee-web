"use client";

import { IApiUserInterface } from "@/interfaces/api.user.interface";
import { apiUserStore } from "@/stores/api.user.store";
import { commonStore } from "@/stores/common.store";
import { headerStore } from "@/stores/header.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function AddContent({ labels }: { labels: any }) {
  const router = useRouter();

  const userList: Array<IApiUserInterface> = apiUserStore(
    (state: any) => state.userList
  );
  const locale = commonStore((state: any) => state.locale);
  const setUserList = apiUserStore((state: any) => state.setUserList);
  const setCurrentIndex = headerStore((state: any) => state.setCurrentIndex);
  const setPathName = headerStore((state: any) => state.setPathName);

  const [userData, setUserData] = useState<IApiUserInterface>({
    id: 999,
    avatar: undefined,
    first_name: "",
    last_name: "",
    email: "",
  });

  // Update the screen index and pathname
  setCurrentIndex(0);
  setPathName("/add");

  function onUploadClick(e: ChangeEvent<HTMLInputElement>) {
    setUserData({
      ...userData,
      avatar: e?.target?.files ? URL.createObjectURL(e?.target?.files[0]) : "",
    });
  }

  function onSubmitClick() {
    if (!userData) return;
    const tmpUserList = [...userList];
    userData.id = Math.random();
    tmpUserList.push(userData as IApiUserInterface);
    setUserList(tmpUserList);

    setCurrentIndex(2);
    setPathName(`/view`);
    router.push(`${locale}/view`);
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
