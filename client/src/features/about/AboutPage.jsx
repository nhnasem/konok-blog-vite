export default function AboutPage() {
  return (
    <div className="relative my-10 w-[600px] mx-auto">
      <div className="absolute -top-[5px] left-6 mt-5">
        <div className="flex flex-col justify-center items-center">
          <div className="w-5 h-5 rounded-full bg-pink-400" />
          <div className="w-[2px] sm:h-80 h-40 bg-pink-400 bg-gradient-to-b from-pink-400 to-white" />
        </div>
      </div>
      <div className="mx-20">
        <h3 className="text-3xl font-light mb-8">
          <span className=" text-5xl font-bold text-pink-400">Hi, </span>I'm
          Obayed Hasan Konok
        </h3>
        <p className="text-black-100 text-xl font-light mb-8 leading-8 tracking-wide">
          I'm a college student who loves sharing <br /> my experiences and
          insights about student life, <br />
          as well as my interests and hobbies.
        </p>
        <p className="text-black-100 text-xl font-light mb-8 leading-8 tracking-wide">
          As a student myself, <br />I understand the struggles and challenges
          <br /> that come with balancing academics, social life, <br /> and
          personal growth.
          <p className="text-black-100 text-xl font-light mb-8 leading-8 tracking-wide">
            <br /> That's why I started this blog, <br />
            to share my own journey
            <br /> and offer advice and tips <br />
            that might help others navigate <br />
            through their own college years.
          </p>
        </p>
        <p className="text-black-100 text-xl font-light mb-8 leading-8 tracking-wide">
          Aside from my passion for education <br /> and personal development,{" "}
          <br />
          I'm also a big fan of anime, manga and novels. <br />I love exploring
          new series and immerse myself <br />
          into the imaginary yet realistic world. <br />
          The ones that I like, I try to share <br /> the joy of it with others
          with my writing.
        </p>
        <p className="text-black-100 text-xl font-light leading-8 tracking-wide">
          Thanks for stopping by. <br /> I hope you enjoy reading my blog!
        </p>
      </div>
    </div>
  );
}
