import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center h-screen w-screen bg-gray-100 p-8">
        <div className="flex justify-center items-center h-screen w-1/2 bg-white border border-gray-300 p-8 mb-4">
          {/* Content for the box */}
          <p>This is the message area.</p>
        </div>


        <div className="flex w-1/2 items-end">
          <input
            type="text"
            placeholder="Enter message here"
            className="rounded-l-lg border border-gray-300 w-full p-2 text-lg focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-500 text-white rounded-r-lg px-4 py-2 text-lg focus:outline-none hover:bg-blue-600 flex items-center justify-center">
            <i className="fas fa-arrow-up mr-2"></i>
            <span>Submit</span>
          </button>
        </div>
        </div>
    </>
  );
};

export default Index;