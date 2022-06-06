import React from "react";
import { Link } from "react-router-dom";
import BookingItem from './booking_item';

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            myBookings: [],
            myListings: [],
            myReviews: [],
            allBookings: [],
            allListings: [],
            currentProfile:{},
        };
        this.toggleReservations = this.toggleReservations.bind(this);
        this.deleteListing = this.deleteListing.bind(this);
        this.deleteBooking = this.deleteBooking.bind(this);

        this.updateAboutMeField = this.updateAboutMeField.bind(this);
        this.handleAboutMe = this.handleAboutMe.bind(this);
        this.handleProfilePic = this.handleProfilePic.bind(this);
        this.toggleAboutMeForm = this.toggleAboutMeForm.bind(this);
    }

    componentDidMount(){
        const {userId, users, bookings, listings, fetchListingsByUser, fetchBookingsByUser, fetchUsers, fetchBookings, fetchListings, fetchReviewsByUser} = this.props;

        fetchUsers()
            .then(() => fetchBookings())
            .then(() => fetchListings().then((res) => {
                this.setState({
                    allListings: this.props.listings,
                    allBookings: this.props.bookings,
                    currentProfile: this.props.users[this.props.match.params.userId]
                })
            }))
            .then(() => fetchListingsByUser(userId))
            .then(() => fetchBookingsByUser(userId))
            .then(() => fetchReviewsByUser(userId))
            .then(() => this.setState({
                myListings: this.props.listings,
                myBookings: this.props.bookings,
                myReviews: this.props.reviews}))

        // fetchListingsByUser(currentUserId)
        //     .then(() => fetchUsers())
        //     .then(() => fetchBookings().then(() => this.setState({allBookings:this.props.bookings})))
        //     .then(() => fetchListings().then(() => this.setState({allListings: this.props.listings})))
        //     .then(() => fetchBookingsByUser(currentUserId))
        //     .then(() => this.setState({myListings: this.props.listings}))
        //     .then(() => this.setState({myBookings: this.props.bookings}))
    }

    // componentDidUpdate(prevProps, prevState){
        // const {listings, bookings, reviews, currentUserId} = this.props;

        // const myListings = Object.values(listings).filter(listing => listing.host_id === currentUserId);
        // const myBookings = Object.values(bookings).filter(booking => booking.guest_id === currentUserId);
        // const myReviews = Object.values(reviews).filter(review => review.guest_id === currentUserId);
        // if (Object.values(prevState.myListings).length !== myListings.length && prevState.myListings.length !== 0){
        //     debugger
        //     this.setState({myListings: this.props.listings});
        // } else if (Object.values(prevState.myBookings).length !== myBookings.length && prevState.myBookings.length !== 0){
        //     debugger
        //     this.setState({myBookings: this.props.bookings});
        // } else if (Object.values(prevState.myReviews).length !== myReviews.length && prevState.myReviews.length !== 0){
        //     debugger
        //     this.setState({myReviews: this.props.reviews})
        // }
    // }

    toggleReservations(listingId){
        Array.from(document.getElementsByClassName(`listing-${listingId}-reservations`)).forEach(el => el.classList.toggle('hidden'));
    }

    deleteListing(listingId){
        this.props.deleteListing(listingId).then(() => this.setState({myListings: this.props.listings}));
    }

    deleteBooking(bookingId){
        this.props.deleteBooking(bookingId).then(() => this.setState({myBookings: this.props.bookings}));
    }

    bookings(){
        // currently it is checking the props from container, probably should change it to check this.state.mybookings --> same with listings
        const {myBookings} = this.state;
        const listings = this.state.allListings;
        // debugger
        return Object.values(myBookings).map((booking,idx) => (
            <div className={`my-booking-${idx} my-booking-item`} key={booking.id}>
                <Link className='profile-link' to={`/listings/${booking.listing_id}`}>{listings[booking.listing_id].title}</Link>
                {/* <p>guest id: {booking.guest_id}</p> */}
                {/* <p>booking: {booking.id}</p> */}
                <p>From {booking.check_in_date} to {booking.check_out_date}</p>
                <button className='fancy-btn cancel-btn pointer' onClick={() => this.deleteBooking(booking.id)}>Delete Booking</button>
            </div>
        ))
    }

    listings(){
        const {users, currentUserId} = this.props;
        const bookings = this.state.allBookings;
        const {myListings} = this.state;
        // debugger
        return Object.values(myListings).map((listing, idx) => (
            <div className='my-listing' key={listing.id}>
                <div className={`my-listing-${idx} my-listing-item`}>
                    <Link to={`/listings/${listing.id}`}>
                        <img src={listing.photoUrls[0]} alt={listing.description} />
                    </Link>
                    <div>
                        <p>{listing.title}</p>
                        <p>{listing.address} {listing.city}, {listing.state} {listing.zipcode}</p>
                        <p>{listing.created_at}</p>
                        <p>{listing.updated_at}</p>
                        <p>{listing.reviews.length} {listing.reviews.length !== 1 ?'reviews' : 'review'}</p>
                        {currentUserId === listing.host_id ? <p className='profile-link' onClick={() => this.toggleReservations(listing.id)}>{listing.bookings.length} {listing.bookings.length !== 1 ?'reservations' : 'reservation'}</p> : <p>{listing.bookings.length} {listing.bookings.length !== 1 ?'reservations' : 'reservation'}</p>}
                        <div>
                            {currentUserId === listing.host_id ? <><Link to={`/listings/${listing.id}/edit`} id='first-button'><button className='fancy-btn pointer'>Edit Listing</button></Link>
                            <button className='fancy-btn cancel-btn pointer' onClick={() => this.deleteListing(listing.id)}>Delete Listing</button></> : <></>}
                        </div>
                    </div>
                </div>
                    <div>
                        {listing.bookings.map(bookingId => <BookingItem key={bookingId} users={users} bookingId={bookingId} bookings={bookings} listing={listing} listings={myListings}/>)} 
                    </div>
            </div>
        ))
    }

    reviews(){
        const {myReviews, allListings} = this.state;
        return Object.values(myReviews).map(review => (
            <div className='profile-review' id={`profile-review-${review.id}`} key={review.id}>
                <Link to={`/listings/${review.listing_id}`} className='profile-link'>{allListings[review.listing_id].title}</Link>
                <p>Overall Rating: {Math.floor(review.overall_rating*10)/10}</p>
                <p>Message: {review.body}</p>
            </div>
        ))

    }

    ProfilePicForm(){
        return (
            <>
                <form>
                    <label className='upload-images'>
                        Update Photo
                        <input type="file" onChange={e => this.handleProfilePic(e)}/>
                    </label>
                </form>
            </>
        )
    }

    AboutMeForm(){
        return (
            <>
                <form onSubmit={this.handleAboutMe} id='about-me-form' className='about-me-form hidden'>
                    <textarea value={this.state.currentProfile.about_me} onChange={e => this.updateAboutMeField(e)} placeholder='Tell us about yourself' cols="30" rows="2"></textarea>
                    <button className='fancy-btn'>Submit</button>
                </form>
            </>
        )
    }

    updateAboutMeField(e){
        e.preventDefault()
        this.setState({
            currentProfile: {
                ...this.state.currentProfile,
                about_me: e.target.value
            }
        })
    }

    handleProfilePic(e){
        e.preventDefault();
        const formData = new FormData();
        const {id} = this.state.currentProfile;
        formData.append('user[id]', id);
        formData.append('user[photo]', e.target.files[0]);
        // console.log(...formData);
        this.props.updateUser(formData);
    }

    handleAboutMe(e){
        e.preventDefault();
        const formData = new FormData();
        const {id, about_me} = this.state.currentProfile;
        formData.append('user[id]', id);
        formData.append('user[about_me]', about_me);
        // console.log(...formData);
        this.props.updateUser(formData).then(() => {
            document.getElementById('about-me-info').classList.toggle('hidden');
            document.getElementById('about-me-form').classList.toggle('hidden');
        });
    }

    toggleAboutMeForm(e){
        e.preventDefault();
        document.getElementById('about-me-info').classList.toggle('hidden');
        document.getElementById('about-me-form').classList.toggle('hidden');
    }

    render(){
        const {userId, users, currentUserId} = this.props;
        const currentProfile = users[userId];
        // console.log(this.state);
        // console.log(this.props.bookings)
        // console.log(this.state)
        // debugger
        if (users[userId]){
            return (
                <div className='profile-container'>
                    <div className='user-profile-info'>
                        <img className='profile-picture' src={currentProfile.profile_pic ? currentProfile.profile_pic : `${window.default_profile_pic}`} alt="profile-pic" />
                        {currentUserId === currentProfile.id ? this.ProfilePicForm() : null}
                        
                    </div>
                    <div className='my-info'>
                        <div className='basic-info'>
                            <p className='biggest-font bold'>Hi, {currentProfile.fname[0].toUpperCase()+currentProfile.fname.slice(1)}!</p>
                            <p className='regular-font'>Joined in {currentProfile.created_at} </p>
                            {currentUserId === currentProfile.id ? 
                                <><p className='underline' onClick={this.toggleAboutMeForm}>Edit Profile</p>
                                <p className='medium-font bold'>About</p>
                                <p id='about-me-info'>{currentProfile.about_me ? currentProfile.about_me : `We don\'t know much about them, but we\'re sure ${currentProfile.fname} is great.`}</p>
                                {this.AboutMeForm()}</> :
                                 <><p className='medium-font bold'>About</p>
                                 <p id='about-me-info'>{currentProfile.about_me ? currentProfile.about_me : `We don\'t know much about them, but we\'re sure ${currentProfile.fname[0].toUpperCase()+currentProfile.fname.slice(1)} is great.`}</p></> }
                        </div>

                        <div className='my-listings'>
                        <hr className='biggest-separator'/>
                            <div className='heading'><h1>Listings</h1> {currentUserId === currentProfile.id ? <Link className="new-listing" to='/listings/new'>Create Listing</Link> : <></>}</div>
                            {this.listings()}
                        </div>
                        {currentUserId === parseInt(userId) ? 
                            <>
                                <div className='my-bookings'>
                                    <hr className='biggest-separator'/>
                                    <div className='heading'><h1>Bookings</h1></div>
                                    {this.bookings()}
                                </div> 
                                <div className='my-reviews'>
                                    <hr className='biggest-separator'/>
                                    <div className='heading'><h1>Reviews</h1></div>
                                    {this.reviews()}
                                </div>
                            </>
                        : <></>}
                    </div>
                </div>
            )
        } else {
            return <>This user doesn't exist!</>
        }
    }
}