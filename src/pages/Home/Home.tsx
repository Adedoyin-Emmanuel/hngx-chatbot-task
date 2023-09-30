import Button from "../../components/Button/Button";
import "./HomeStyle.css";

const Home = (): JSX.Element => {
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <section className="modal bg-slate-50 shadow w-11/12 md:w-2/4 lg:w-1/4 h-72 rounded p-4 flex flex-col justify-around">
        <section className="top">
          <h3 className="capitalize font-bold text-2xl">welcome to krisp</h3>

          <p className="capitalize text-sm text-gray-600 py-2">
            krisp is your personal AI chatbot
          </p>
        </section>
        <section className="flex items-center justify-center mt-10">
          <Button className="w-full">chat with krisp</Button>
        </section>
      </section>
    </section>
  );
};

export default Home;
