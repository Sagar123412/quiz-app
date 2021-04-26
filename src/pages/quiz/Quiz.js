import CircularProgress from '@material-ui/core/CircularProgress';
import React,{ useState, useEffect} from 'react'
import Question from '../../components/Question/Question';
import './Quiz.css'

function Quiz({name, questions, score, setScore, setQuestions}) {
    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);


    // suffling all options 

    useEffect(() => {
        console.log(questions);
         setOptions(
            questions &&
            handleShuffle([
                questions.[currQues]?.correct_answer,
                ...questions[currQues].incorrect_answers
            ])
         );
            
    }, [questions, currQues]);

    console.log(options);

    const handleShuffle = (opetions) => {
        return opetions.sort(() => Math.random() - 0.5)
    };

    return (
        <div className="quiz">
            <span className="subtitle">Welcome, <b>{name}</b></span>
            {questions? (
                <>
                    <div className="quizInfo">
                        <span>{questions[currQues].category}</span>
                        <span><b>Score: </b>{score}</span>
                    </div>

                    <Question 
                      currQues={currQues}
                      setCurrQues={setCurrQues}
                      questions={questions}
                      options={options}
                      correct={questions[currQues]?.correct_answer}
                      score={score}
                      setScore={setScore}
                      setQuestions={setQuestions}  
                    />
                </>
            ):(
                <CircularProgress 
                    style={{ margin: 100}}
                    color="inherit"
                    size={150}
                    thickness={1}
                />
            )}
        </div>
    )  
}

export default Quiz
