import React, { useState } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import copy from "copy-to-clipboard";

import Avathar from '../component/Avathar/Avathar'
import upVote from '../assets/sort-up-solid.svg'
import downVote from '../assets/sort-down-solid.svg'
import '../component/QuestionDetails.css'
import DisplayAnswer from './DisplayAnswer'
import { useSelector } from "react-redux";
import { postAnswer } from '../actions/question'
import { deleteQuestion,voteQuestion } from '../actions/question';



const QuestionDetails = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = "http://localhost:3000";

  const { id } = useParams()
  const questionsList = useSelector((state) => state.questionsReducer);
  // var questionsList = [{
  //   _id: '1',
  //   upVotes: 3,
  //   downVotes: 2,
  //   noOfAnswer: 2,
  //   questionTitle: "What is function ?",
  //   questionBody: "It meant to be",
  //   questionTags: ["java", "node js", "react", "Mongodb"],
  //   userPosted: "mano",
  //   userId: 1,
  //   askedOn: "jan 1",
  //   answer: [{
  //     answerBody: "Answer",
  //     userAnswered: "kumar",
  //     answeredOn: "jan2",
  //     userId: 2
  //   }]
  // },
  // {
  //   _id: '2',
  //   upVotes: 0,
  //   downVotes: 2,
  //   noOfAnswer: 0,
  //   questionTitle: "What is function ?",
  //   questionBody: "It meant to be",
  //   questionTags: ["javascript", "R", "python"],
  //   userPosted: "mano",
  //   userId: 1,
  //   askedOn: "jan 1",
  //   answer: [{
  //     answerBody: "Answer",
  //     userAnswered: "kumar",
  //     answeredOn: "jan2",
  //     userId: 2
  //   }]
  // },
  // {
  //   _id: '3',
  //   upVotes: 1,
  //   downVotes: 3,
  //   noOfAnswer: 2,
  //   questionTitle: "What is function ?",
  //   questionBody: "It meant to be",
  //   questionTags: ["javascript", "R", "python"],
  //   userPosted: "mano",
  //   userId: 1,
  //   askedOn: "jan 1",
  //   answer: [{
  //     answerBody: "Answer",
  //     userAnswered: "kumar",
  //     answeredOn: "jan2",
  //     userId: 2
  //   }]
  // }]
  //console.log(questionsList)
  const [Answer, setAnswer] = useState("");
  const User = useSelector((state) => state.currentUserReducer);
  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      if (Answer === '') {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name, userId:User.result._id
          })
        );
        //setAnswer("");
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
     dispatch(deleteQuestion(id, Navigate));
  };

  // const handleUpVote = () => {
  //   if (User === null) {
  //     alert("Login or Signup to up vote a question");
  //     Navigate("/Auth");
  //   } else {
  //     dispatch(voteQuestion(id, "upVote"));
  //   }
  // };

  // const handleDownVote = () => {
  //   if (User === null) {
  //     alert("Login or Signup to down vote a question");
  //     Navigate("/Auth");
  //   } else {
  //     dispatch(voteQuestion(id, "downVote"));
  //   }
  // };

  const handleUpVote =()=>{
    dispatch(voteQuestion(id,'upVote',User.result._id))
  }
  const handleDownVote =()=>{
    dispatch(voteQuestion(id,'downVote',User.result._id))
  }
  return (
    <div className='question-details-page'>
      {questionsList.data === null ?
        <h1>Loading...</h1> :
        <>
          {
            questionsList.data.filter(question => question._id === id).map(question => (
              <div key={question._id}>
                <section className='question-details-container'>
                  <h1>{question.questionTitle}</h1>
                  <div className='question-details-container-2'>
                    <div className='question-votes'>
                      <img src={upVote} alt='' width='18' className='votes-icon'  onClick={handleUpVote} />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img src={downVote} alt='' width='18' className='votes-icon' onClick={handleDownVote} />
                    </div>
                    <div style={{ width: '100%' }}>
                      <p className='question-body'>{question.questionBody}</p>
                      <div className='question-details-tags'>
                        {
                          question.questionTags.map((tag) => (
                            <p key={tag}>{tag}</p>
                          ))
                        }
                      </div>
                      <div className='question-actions-user'>
                        <div>
                          <button type='button' onClick={handleShare} >Share</button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>)}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link to={`/Users/${question.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                            <Avathar backgroundColor="orange" px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avathar>
                            <div>
                              {question.userPosted}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {
                  question.noOfAnswer !== 0 && (
                    <section>
                      <h3>{question.noOfAnswers} Answer</h3>
                      <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                    </section>
                  )
                }
                <section className='post-ans-container'>
                  <h3>Your Answer</h3>
                  <form onSubmit={(e) => { handlePostAns(e, question.answer.length); }}>
                    <textarea name='' id='' cols='30' rows='10' onChange={(e) => setAnswer(e.target.value)}></textarea><br />
                    <input type='Submit' className='post-ans-btn' value='Post Your Answer' />
                  </form>
                  <p>
                    Browse other questions tagged
                    {
                      question.questionTags.map((tag) => (
                        <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                      ))
                    }or
                    <Link to='/AskQuestion' style={{ textDecoration: 'none', color: '#009dff' }}> ask your own question</Link>
                  </p>
                </section>
              </div>
            ))
          }
        </>
      }
    </div>
  )
}

export default QuestionDetails