import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "react-toastify";
import { notify } from "../App";
import { z } from "zod";
import { CartProps } from "./Cart";

interface SubmitComponentProps<T> {
  setCartItems: Dispatch<SetStateAction<T>>;
  cartItem: T;
}

const formSchema = z.object({
  name: z.string().min(1, "نام فیلد الزامی است"),
  phone: z.string().regex(/^09\d{9}$/, "شماره تماس میبایست معتبر باشد"),
  address: z.string().min(10, "آدرس معتبر نیست"),
});

type FormErrors = Record<string, string>;

export function Submit({
  setCartItems,
  cartItem,
}: SubmitComponentProps<CartProps[]>) {
  //uncontroled

  //   const nameRef = useRef();
  //   const phoneRef = useRef();
  //   const addressRef = useRef();
  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const data = {
    //   name: nameRef.current.value,
    //   ...
    // };
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const data = {
        name: formData.get("name")?.toString() || "", //t is not usually necessary
        phone: formData.get("phone")?.toString() || "", //t is not usually necessary
        address: formData.get("address")?.toString() || "", //t is not usually necessary
      };
      const result = formSchema.safeParse(data);
      if (!result.success) {
        const newErrors: FormErrors = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setErrors({});
        setCartItems([]);
        notify(`سفارش شما به کد ${Date.now()} ثبت شد`);
        formRef.current.reset();
        handleCloseModal();
      }
    }
  };

  const handleOpenModal = () => {
    const modal = document.querySelector('[data-dialog="submit-modal"]');
    const backdrop = document.querySelector(
      '[data-dialog-backdrop="submit-modal"]'
    );
    if (modal && backdrop) {
      modal.classList.remove("hidden", "opacity-0");
      backdrop.classList.remove("hidden", "opacity-0");
    }
  };

  const handleCloseModal = () => {
    const modal = document.querySelector('[data-dialog="submit-modal"]');
    const backdrop = document.querySelector(
      '[data-dialog-backdrop="submit-modal"]'
    );
    if (modal && backdrop) {
      modal.classList.add("hidden", "opacity-0");
      backdrop.classList.add("hidden", "opacity-0");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.dialogBackdrop) {
      handleCloseModal();
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        disabled={cartItem.length == 0}
        className=" w-full bg-amber-600 py-2 px-4 border border-transparent 
          
  text-center rounded-lg 
      font-extrabold text-white text-xl tracking-wider transition-all shadow-md hover:shadow-lg
   focus:bg-slate-700 focus:shadow-none active:bg-slate-700  ease-in duration-1000
   hover:bg-slate-700 active:shadow-none disabled:pointer-events-none 
   disabled:opacity-50 disabled:shadow-none ml-2"
      >
        ثبت سفارش
      </button>{" "}
      <div
        data-dialog-backdrop="submit-modal"
        onClick={handleBackdropClick}
        data-dialog-backdrop-close="true"
        className="pointer-events-auto fixed inset-0 z-40 grid h-screen
       w-screen place-items-center bg-black bg-opacity-60 opacity-0 
       backdrop-blur-sm transition-opacity duration-300 hidden"
      >
        <div
          data-dialog="submit-modal"
          className="relative mx-auto w-full max-w-[32rem] z-50 rounded-lg
         overflow-hidden shadow-sm"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid grid-rows-5 bg-white h-full px-16 py-10"
          >
            <h1 className="text-gray-800 text-3xl font-extrabold">ثبت سفارش</h1>
            <div className="flex-col">
              <input
                type="text"
                name="name"
                placeholder="نام و نام خانوادگی:"
                className="border-2 w-full rounded-lg p-2"
              />

              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
            <div className="flex-col">
              <input
                type="phone"
                name="phone"
                placeholder="شماره تماس:"
                className="border-2 w-full rounded-lg p-2 mt-1"
              />

              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="آدرس"
                className="border-2 w-full rounded-lg p-2 mt-2"
              />
              {errors.address && (
                <p style={{ color: "red" }}>{errors.address}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-amber-600 mt-4 text-white text-lg font-extrabold w-full rounded-lg p-2 mt-1"
            >
              ثبت سفارش
            </button>
            <button
              onClick={handleCloseModal}
              className="border-2 text-gray-800 text-lg font-extrabold w-full rounded-lg p-2 mt-1"
              type="submit"
            >
              لغو
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
