export default function AboutPage() {
  return (
    <div className="xs:w-full sm:w-[500px] relative mb-20 mx-auto transition-all duration-300 ease-in ">
      {/* <div className="absolute -top-[5px] left-6 mt-5">
        <div className="flex flex-col justify-center items-center">
          <div className="w-5 h-5 rounded-full bg-pink-400" />
          <div className="w-[2px] sm:h-80 h-40 bg-pink-400 bg-gradient-to-b from-pink-400 to-white" />
        </div>
      </div> */}
      <div className="mx-auto px-10">
        <h3 className="text-3xl font-light mb-8">
          Hi, I'm{" "}
          <span className=" text-4xl font-bold text-opacity-50 text-black-100 tracking-wider">
            Konok
          </span>
        </h3>

        <p className="text-black-100 text-xl font-light mb-8 leading-8 tracking-wide">
          I'm a college student who <br className="" /> loves sharing
          my experiences <br className="" /> and insights about student
          life, <br className="" /> as well as my interests and
          hobbies.
        </p>

        <p className="text-black-100 text-xl font-light mb-8 leading-8 tracking-wide">
          As a student myself, <br className="sm:hidden" /> I understand{" "}
          <br className="" /> the struggles{" "}
          <br className="md:hidden" /> and challenges that come{" "}
          <br className="sm:hidden" /> with balancing academics,{" "}
          <br className="sm:hidden" /> social life, and{" "}
          <br className="" /> personal growth.
        </p>

        <p className="text-black-100 text-xl font-light mb-8 leading-8 tracking-wide">
          That's why I started this blog. <br className="" />I want to share
          my own journey <br className="" /> and offer advice and tips{" "}
          <br className="" />
          that might help others <br className="" /> navigate through
          their own <br className="" /> college years.
        </p>

        <p className="text-black-100 text-xl font-light mb-8 leading-8 tracking-wide">
          Aside from my passion for education <br className="" /> and
          personal development, <br className="" />
          I'm also a big fan of anime, <br className="" /> manga and
          novels. <br className="" />I love exploring new series{" "}
          <br className="" /> and immerse myself into{" "}
          <br className="" />
          the imaginary yet realistic world. <br className="" />
          The ones that I like, I try to share <br className="" /> the
          joy of it with others <br className="sm:hidden" /> with my writing.
        </p>
        <p className="text-black-100 text-xl font-light leading-8 tracking-wide">
          Thanks for stopping by. <br className="" /> I hope you enjoy
          reading my blog!
        </p>
      </div>
    </div>
  );
}
