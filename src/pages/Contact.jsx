import React, { Suspense, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "react-three-fiber";
import Fox from "../models/Fox";
import Loader from "../components/Loader";
import { CustomAlert } from "../components/CustomAlert";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = (e) => setCurrentAnimation("walk");
  const handleBlur = (e) => setCurrentAnimation("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");
    try {
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Arifin",
          from_email: form.email,
          to_email: "arifinwidy@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setTimeout(() => {
        setCurrentAnimation("idle");
        setForm({ name: "", email: "", message: "" });
        setIsLoading(false);
        CustomAlert({
          title: "Your message has been sent !",
          icon: "success",
        });
      }, [3000]);
      // Doing success and not succes
    } catch (error) {
      console.log("error:", error);
      CustomAlert({
        title: "Oops!...",
        text: error.message,
        icon: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col relative lg:flex-row max-container">
      <div className="flex flex-col flex-1 min-w-[50%]">
        <h1 className="head-text">Get in Touch</h1>
        <form
          className="w-full flex gap-7 flex-col mt-14"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label className="font-semibold text-black-500">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="John Doe"
            value={form.name}
            required
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></input>
          <label className="font-semibold text-black-500">E-mail</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="john_doe@gmail.com"
            value={form.email}
            required
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></input>
          <label className="font-semibold text-black-500">Message</label>
          <textarea
            type="description"
            name="message"
            rows={4}
            className="textarea"
            placeholder="Let me know what can i help you!"
            value={form.message}
            required
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></textarea>
          <button className="btn">
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
              currentAnimation={currentAnimation}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
