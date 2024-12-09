import React, { useRef } from "react";
import { toast } from "react-toastify";
import { notify } from "../App";

export function Submit() {
  //uncontroled

  //   const nameRef = useRef();
  //   const phoneRef = useRef();
  //   const addressRef = useRef();
  const formRef = useRef<HTMLFormElement>(null);

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

      notify(`data ${data.address}`);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label>
          نام و نام خانوادگی:
          <input type="text" name="name" />
        </label>
      </div>
      <div>
        <label>
          شماره تماس:
          <input type="phone" name="phone" />
        </label>
      </div>
      <div>
        <label>
          آدرس:
          <input type="text" name="address" />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
