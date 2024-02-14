import React from "react";
const Home = () => {
  return (
    <div className="lg:w-9/12 font-medium mx-auto xs:px-4 sm:px-16 md:px-24 lg:px-32 xl:px-40">
      <h1 className="mb-5 font-Inter text-center bg-gradient-to-r from-rose-800 font-semibold tracking-wider underline decoration-sky-500 to-emerald-800 md:text-3xl bg-clip-text text-transparent">
        Complete MERN-STACK authentication{" "}
      </h1>
      <p className="p-3 shadow-md shadow-gray-200 rounded-md text-sm w-full">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Introducing a robust MERN stack
        application designed to elevate your user experience! Our app seamlessly
        integrates MongoDB, Express.js, React.js, and Node.js to deliver a
        dynamic platform tailored for your needs. At the heart of our solution
        lies comprehensive authentication, augmented by Google authentication
        for a secure and hassle-free login process. With a primary focus on
        security, all routes within our app are fortified with JWT (JSON Web
        Tokens), ensuring that your data remains confidential and accessible
        only to authorized users. Whether you're accessing sensitive information
        or performing critical operations, rest assured that your interactions
        are shielded by the latest in authentication protocols. But that's just
        the beginning. Our app empowers you with full CRUD (Create, Read,
        Update, Delete) capabilities, enabling seamless management of your data.
        Whether you're creating new entries, retrieving essential information,
        updating existing records, or removing outdated data, our intuitive
        interface streamlines these operations, saving you time and effort.
        Experience the power of modern web development with our MERN stack
        application. From robust authentication mechanisms to streamlined CRUD
        operations, we've got you covered every step of the way. Join us on this
        journey of innovation and efficiency as we redefine the standards of web
        application development.
      </p>
    </div>
  );
};

export default Home;
