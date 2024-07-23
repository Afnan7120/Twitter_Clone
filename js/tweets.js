$(document).ready(function() {
    var tweets = [];
    var currentPage = 1;
    var pageSize = 5;

    $.ajax({
        type: 'GET',
        url: 'tweets.json',
        dataType: 'json',
        success: function(data) {
        tweets = data;
        // Generate pagination links
        var paginationHtml = Pagination();
        $('.pagination').html(paginationHtml);
        // Update the tweet list with the first page
        updateTweetList(currentPage);
        }
    });

    function Pagination() {
        var totalPages = Math.ceil(tweets.length / pageSize);
        var paginationHtml = '';

        for (var i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHtml += '<li class="page-item active"><a class="page-link" href="#">' + i + '</a></li>';
        } else {
            paginationHtml += '<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>';
        }
        }

        return paginationHtml;
    }

    function updateTweetList(pageNumber) {
        var start = (pageNumber - 1) * pageSize;
        var end = start + pageSize;
        var tweetsToShow = tweets.slice(start, end);
    
        // Clear the tweet list before updating it
        $('.tweets').empty();
    
        // Loop through the tweets and generate HTML elements
        $.each(tweetsToShow, function(index, tweet) {
            var tweetHTML = `
                <div class="row m-4 p-3 border d-flex">
                    <div class="col-3">
                        <img class="rounded-circle" src="${tweet.image_url}" alt="" height="60px">
                    </div>
                    <div class="col-9 ps-0 ">
                        <div class="row d-flex justify-content-between align-items-center ps-1">
                            <div class="col-10 pt-2">
                                <p><span class="fw-bold">${tweet.name}</span> @${tweet.username} ${tweet.timestamp}</p>
                            </div>
                            <div class="col-1  ps-0">
                                <div><span><i class="fa-solid fa-ellipsis fs-5 py-3"></i></span></div>
                            </div>
                        </div>

                          <div class="col p-2">
                        ${typeof tweet.content === 'string' && (tweet.content.startsWith('https')) ? 
                            (tweet.content.endsWith('.mp4') || tweet.content.endsWith('.webp'))  ? 
                            `<video width="100%" controls>
                                <source src="${tweet.content}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>` : 
                            `<img src="${tweet.content}" alt=""  style = "width:100%">` : tweet.content}
                        <br>  
                    </div>
                </div>
            `;
            $('.tweets').append(tweetHTML);
        });
    }
    
    $(document).on('click', '.pagination .page-link', function(event) {
        event.preventDefault();
        var pageNumber = parseInt($(this).text());
        currentPage = pageNumber;
        
        // Update the pagination links
        $('.pagination').html(Pagination());
        
        // Update the tweet list with the new page
        updateTweetList(currentPage);
    });
});