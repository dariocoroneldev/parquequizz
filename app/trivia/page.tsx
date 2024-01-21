import TriviaComp from "../components/triviacomp/triviaComp";

const Trivia = () => {
    return(
        <div className="bg-gray-400 flex items-center justify-center h-screen">
            <div className="h-4/5 max-w-screen-sm w-4/5">
                <TriviaComp />
            </div>
        </div>
    );
};

export default Trivia;