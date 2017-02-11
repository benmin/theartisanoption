var Review = React.createClass({
    displayname: 'Review',
    
    getInitialState: function() {
        return {
            
        };
    },
    
    render: function() {
        return (
            <div className="gw-column review">
                <div className="gw-row review-title-row">
                    <div className="review-title">{this.props.review.title}</div>
                    <div className="review-rating">{this.props.review.rating}/5 Stars</div>
                </div>
                <div className="review-content">{this.props.review.content}</div>
                <div className="review-reviewer">Reviewed by: {this.props.review.reviewerName}</div>
                <div className="review-helpful">8 out of 11 found this review helpful.</div>
            </div>
        );
    }
});

var ReviewSection = React.createClass({
    displayName: 'ReviewSection',
    
    getInitialState: function() {
        return {
            
        };
    },
    
    
    
    render: function() {
        return (
            <div className="gw-column">
                <button className="btn btn-primary">Leave Review</button>
                {this.props.reviews.map(function(review, i) {
                    return <Review 
                               key={i}
                               review={review} />
                }, this)}
            </div>
        );
    }
});

module.exports = {
    ReviewSection: ReviewSection,
    Review: Review
};