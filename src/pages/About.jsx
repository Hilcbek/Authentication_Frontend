import React from "react";

const About = () => {
  return (
    <div className="lg:w-11/12 flex-col xl:flex-row bg-gradient-to-r from-rose-50 to-emerald-50 font-medium mx-auto xs:px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40 flex items-center justify-center">
      <div className="w-full h-[750px]">
        <img src="/bg.png" className="w-full h-full object-contain" alt="" />
      </div>
      <div className="w-full">
        <p className="text-gray-600 tracking-wider font-Inter">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Embarking on a journey in the realm of
          software development, I proudly stand as a full-stack developer
          specializing in MERN (MongoDB, Express.js, React.js, Node.js) and
          React Native technologies. With 2.5 years of hands-on experience under
          my belt, I have honed my skills through numerous projects, each
          presenting unique challenges and opportunities for growth. My journey
          in the world of programming has been a dynamic one, marked by a
          relentless pursuit of excellence and innovation. From crafting elegant
          front-end interfaces with React.js to building robust back-end systems
          with Node.js and Express.js, I have traversed the diverse landscape of
          web and mobile development with unwavering determination. In addition
          to my professional endeavors, I am currently enrolled as a fourth-year
          graduate student at HILCoE (School of Computer Science and
          Technology), where I continue to expand my knowledge and expertise in
          the field. With graduation on the horizon in 2024, I eagerly
          anticipate the opportunity to further contribute to the ever-evolving
          landscape of technology. If you share my passion for innovation and
          are seeking a dedicated collaborator for your next project, I invite
          you to reach out to me. Whether you require assistance with MERN stack
          development, React Native app creation, or any other aspect of
          software engineering, I am ready to bring my skills and experience to
          the table. Together, let us embark on a journey of creativity,
          problem-solving, and success.
        </p>
      </div>
    </div>
  );
};

export default About;
