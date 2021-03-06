import React from "react";
import {FaStar} from 'react-icons/fa';

export default class ReviewForm extends React.Component{
    constructor(props){
        super(props);
        this.state=this.props.review;

        this.reviewId = this.props.review.id;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);

        this.updateBody = this.updateBody.bind(this);
        this.cleanliness = this.cleanliness.bind(this);
        this.accuracy = this.accuracy.bind(this);
        this.communication = this.communication.bind(this);
        this.location = this.location.bind(this);
        this.checkIn = this.checkIn.bind(this);
        this.value = this.value.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    componentDidMount(){
        if (this.props.formType === 'Create') {
            this.setState({
                listing_id: this.props.match.params.listingId,
                guest_id: this.props.currentUserId 
            })
        }
        
        const cleanliness = document.getElementsByClassName(`cleanliness-stars-${this.reviewId}`);
        const accuracy = document.getElementsByClassName(`accuracy-stars-${this.reviewId}`);
        const communication = document.getElementsByClassName(`communication-stars-${this.reviewId}`);
        const location = document.getElementsByClassName(`location-stars-${this.reviewId}`);
        const check_in = document.getElementsByClassName(`check-in-stars-${this.reviewId}`);
        const value = document.getElementsByClassName(`value-stars-${this.reviewId}`);

        for(let i = 0; i < 5; i++){
            cleanliness[i].addEventListener('click', this.updateScore('cleanliness', i))
            accuracy[i].addEventListener('click', this.updateScore('accuracy', i))
            communication[i].addEventListener('click', this.updateScore('communication', i))
            location[i].addEventListener('click', this.updateScore('location', i))
            check_in[i].addEventListener('click', this.updateScore('check-in', i))
            value[i].addEventListener('click', this.updateScore('value', i))
        }
    }

    handleSubmit(e){
        e.preventDefault();

        this.props.submitForm({review:this.state})
        if (this.state.body.length > 0){
            this.toggleEdit(this.reviewId)();
        }
    }

    updateScore(field, num){
        return () => {
            this.setState({[field.replaceAll('-','_')]: num+1}, () => {
                const {cleanliness, accuracy, communication, location, check_in, value} = this.state;
                const overall_rating = (cleanliness+accuracy+communication+location+check_in+value)/6;
                this.setState({overall_rating})
            })

            const allStars = document.getElementsByClassName(`${field}-stars-${this.reviewId}`);
            for (let i = 0; i <= num; i++){
                allStars[i].style.color = '#dc0e63';
            }
            for (let i = num+1; i < 5; i++){
                allStars[i].style.color = '#C8C8C8';
            }
        }
    }

    updateBody(e){
        e.preventDefault();
        this.setState({body:e.target.value})
    }

    toggleEdit(num){
        return () => {
            document.getElementById(`edit-review-wrap-${num}`).classList.toggle('hidden');
            document.getElementById(`review-${num}`).classList.toggle('hidden');
        }
    }

    clearFields(){
        this.setState({
            listing_id: '',
            guest_id: '',
            body: '',
            overall_rating: 0,
            cleanliness: 0,
            accuracy: 0,
            communication: 0,
            location: 0,
            check_in: 0,
            value: 0
        })
    }

    cleanliness(){
        const arr = [];
        for (let i = 1; i <= 5; i++){
            if (i <= this.state.cleanliness){
                arr.push(<FaStar key={`cleanliness${i}`} color='#dc0e63' className={`cleanliness-stars-${this.reviewId}`} id={`star-${i-1}`}/>);
            } else {
                arr.push(<FaStar key={`cleanliness${i}`} className={`cleanliness-stars-${this.reviewId}`} id={`star-${i-1}`}/>)
            }
        }
        return <>
            <label> Cleanliness:&nbsp;
                {arr}
            </label>
        </>
    }

    accuracy(){
        const arr = [];
        for (let i = 1; i <= 5; i++){
            if (i <= this.state.accuracy){
                arr.push(<FaStar key={`accuracy${i}`} color='#dc0e63' className={`accuracy-stars-${this.reviewId}`} id={`star-${i-1}`}/>);
            } else {
                arr.push(<FaStar key={`accuracy${i}`} className={`accuracy-stars-${this.reviewId}`} id={`star-${i-1}`}/>)
            }
        }
        return <>
            <label> Accuracy:&nbsp;
                {arr}
            </label>
        </>
    }
    communication(){
        const arr = [];
        for (let i = 1; i <= 5; i++){
            if (i <= this.state.communication){
                arr.push(<FaStar key={`communication${i}`} color='#dc0e63' className={`communication-stars-${this.reviewId}`} id={`star-${i-1}`}/>);
            } else {
                arr.push(<FaStar key={`communication${i}`} className={`communication-stars-${this.reviewId}`} id={`star-${i-1}`}/>)
            }
        }
        return <>
            <label> Communication:&nbsp;
                {arr}
            </label>
        </>
    }
    location(){
        const arr = [];
        for (let i = 1; i <= 5; i++){
            if (i <= this.state.location){
                arr.push(<FaStar key={`location${i}`} color='#dc0e63' className={`location-stars-${this.reviewId}`} id={`star-${i-1}`}/>);
            } else {
                arr.push(<FaStar key={`location${i}`} className={`location-stars-${this.reviewId}`} id={`star-${i-1}`}/>)
            }
        }
        return <>
            <label> Location:&nbsp;
                {arr}
            </label>
        </>
    }
    checkIn(){
        const arr = [];
        for (let i = 1; i <= 5; i++){
            if (i <= this.state.check_in){
                arr.push(<FaStar key={`checkin${i}`} color='#dc0e63' className={`check-in-stars-${this.reviewId}`} id={`star-${i-1}`}/>);
            } else {
                arr.push(<FaStar key={`checkin${i}`} className={`check-in-stars-${this.reviewId}`} id={`star-${i-1}`}/>)
            }
        }
        return <>
            <label> Check-in:&nbsp;
                {arr}
            </label>
        </>
    }
    value(){
        const arr = [];
        for (let i = 1; i <= 5; i++){
            if (i <= this.state.value){
                arr.push(<FaStar key={`value${i}`} color='#dc0e63' className={`value-stars-${this.reviewId}`} id={`star-${i-1}`}/>);
            } else {
                arr.push(<FaStar key={`value${i}`} className={`value-stars-${this.reviewId}`} id={`star-${i-1}`}/>)
            }
        }
        return <>
            <label> Value:&nbsp;
                {arr}
            </label>
        </>
    }

    render(){
        const errors = this.props.errors.map((err,idx) => <p key={idx} className='error-message'>{err}</p>);
        return (
            <div className='edit-review-wrap hidden' id={`edit-review-wrap-${this.reviewId}`}>
                <form className='review-form' onSubmit={this.handleSubmit}>
                    <label>
                        <textarea rows='5' cols='30' onChange={this.updateBody} value={this.state.body} placeholder='Comments'></textarea>
                    </label>
                        {this.cleanliness()}<br />
                        {this.accuracy()}<br />
                        {this.communication()}<br />
                        {this.location()}<br />
                        {this.checkIn()}<br />
                        {this.value()}
                        {errors}
                        <button className='fancy-btn'>{this.props.formType} Review</button>
                        <input type="button" className='fancy-btn cancel-btn' value="Cancel" onClick={this.toggleEdit(this.reviewId)} />
                </form>
            </div>
        )
    }

}