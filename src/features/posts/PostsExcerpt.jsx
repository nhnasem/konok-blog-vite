import { Link } from "react-router-dom";
import { Tilt } from "react-tilt";
import { useGetPostsQuery } from "./postsSlice";
import TimeAgo from "./TimeAgo";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 5, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 10, // Speed of the enter/exit transition
  transition: false, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.93,.98,.92,.99)", // Easing on enter/exit.
};

const PostsExcerpt = ({ post }) => {
  // const { post } = useGetPostsQuery("getPosts", {
  //   selectFromResult: ({ data }) => ({
  //     post: data?.entities[postId],
  //   }),
  // });

  return (
    <article className="mx-4 my-2 w-80 cursor-pointer">
      {/* <div className="absolute -top-[1px] -left-[9px] mt-5">
        <div className="flex flex-col justify-center items-center">
          <div className="w-4 h-4 rounded-full bg-pink-400" />
          <div className="w-[2px] sm:h-80 h-40 bg-pink-400 bg-gradient-to-b from-pink-400 to-white" />
        </div>
      </div> */}

      {/* <div className="flex items-start">
        <div className="w-[200px]">
          <img src={post.imageURL} alt="image" />
        </div>
        <h2 className=" text-2xl text-gray-800">{post.title}</h2>
      </div> */}

      {/* <div
        dangerouslySetInnerHTML={{ __html: post.body.substring(0, 200) }}
        className="font-light"
      >
        {post.body.substring(0, 75)}...
      </div> */}

      {/* <p className="shadow-md text-center font-light rounded-md px-2 py-1 w-28 my-4 bg-green-600 hover:bg-green-700 text-white transition-all duration-150 ease-in">
        <Link to={`post/${post.id}`}>View Post</Link>
      </p> */}

      <Tilt options={defaultOptions}>
        <Link to={`post/${post._id}`}>
          <div className="w-full shadow-card2 hover:shadow-lg transition-all ease-in duration-200 flex flex-col overflow-hidden rounded-2xl bg-[#ECE9E6] bg-gradient-to-r from-[#fff] to-[#ECE9E6]">
            <div>
              <img
                src={post.imageURL}
                alt="card__image"
                width="600"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              {/* <span class="tag tag-blue">Technology</span> */}
              <h4 className="text-2xl capitalize">{post.title}</h4>
              {/* <p
              dangerouslySetInnerHTML={{ __html: post.body.substring(0, 200) }}
            ></p> */}
            </div>
            <div className="flex p-4 mt-auto">
              <div>
                <TimeAgo timestamp={post.createdAt} />
              </div>
            </div>
          </div>
        </Link>
      </Tilt>
    </article>
  );
};

export default PostsExcerpt;
