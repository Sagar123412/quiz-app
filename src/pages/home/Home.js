import { Button, MenuItem, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import './Home.css'
import Categories from '../data/Categories'
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Footer from '../../components/Footer';

function Home({name, setName, fetchQuestions }) {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);

    const history = useHistory();

    const handleSubmit = () => {
        if(!category || !difficulty || !name){
            setError(true);
            return;
        }else{
            setError(false);
            fetchQuestions(category, difficulty);
            history.push("/quiz");
        }
    }
    return (
        <div className="content">
            <div className="settings">
                <span style={{fontSize: "30px"}}>Setup A Quiz</span>

                <div className="settings_select">

                    {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}

                    <TextField 
                        style={{marginBottom: 20}}
                        label="Enter Your Name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        select
                        variant="outlined"
                        label="Select Category"
                        style={{ marginBottom: 20}}
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        {Categories.map(cat => (
                            <MenuItem key={cat.category} value={cat.value}>
                                {cat.category}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Select difficulty"
                        variant="outlined"
                        style={{ marginBottom: 20}}
                        onChange={(e) => setDifficulty(e.target.value)}
                        value={difficulty}

                    >
                        <MenuItem key="Easy" value="easy"> 
                            Easy
                        </MenuItem>
                        <MenuItem key="Medium" value="medium"> 
                            Medium
                        </MenuItem>
                        <MenuItem key="Hard" value="hard"> 
                            Hard
                        </MenuItem>
                    </TextField>

                    <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
                        Start Quiz
                    </Button>
                </div>
                <Footer />
            </div>
            <img src="/quiz.svg" className="banner" alt="quiz img"/>
        </div>
    )
}

export default Home
 