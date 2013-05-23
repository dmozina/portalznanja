/**
 * Handles down and up voting of Comments.
 * @param what - string containing char and comment id. Char is either u for upvote action or d for downvote action.
 */
function voteComment(what) {
    var commentId= what.split(":")[1];
    var action = "";
    if (what.charAt(0) == "u") {
        action = "up";
    } else if (what.charAt(0) == "d") {
        action = "down";
    }

    var keyVal = { "commentId" : commentId, "action" : action}
    $.ajax({
        type: "POST",
        url: "/maniComment/",
        data: keyVal,
        statusCode: {
            200: function (data) {
                $('#resultVote' + commentId).html("Successfully voted!");
                $('#resultVote' + commentId).addClass('green');
            },
            403: function (data) {
                window.location = "/login/"
            },
            400: function (data) {
                $('#resultVote' + commentId).html("Error voting!");
                $('#resultVote' + commentId).addClass('red');
            }
        }
    });
};

/**
 * Handles down and up voting of Videos.
 * @param what - string containing char and comment id. Char is either u for upvote action or d for downvote action.
 */
function voteVideo(what) {
    var videoId= what.split(":")[1];
    var action = "";
    if (what.charAt(0) == "u") {
        action = "up";
    } else if (what.charAt(0) == "d") {
        action = "down";
    }

    var keyVal = { "videoId" : videoId, "action" : action}
    $.ajax({
        type: "POST",
        url: "/maniVideo/",
        data: keyVal,
        statusCode: {
            200: function (data) {
                $('#resultVoteVideo').html("Successfully voted!");
                $('#resultVoteVideo').addClass('green');
            },
            403: function (data) {
                window.location = "/login/"
            },
            400: function (data) {
                $('#resultVoteVideo').html("Error voting!");
                $('#resultVoteVideo').addClass('red');
            }
        }
    });
}

/**
 * Overload the default submit method.
 */
var frm = $('#myForm');
frm.submit(function () {
    $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        statusCode: {
            200: function (data) {
                $('#result').html("Successfully added new comment!");
                $('#result').addClass('green');
            },
            400: function (data) {
                $('#result').html("Error adding new comment!");
                $('#result').addClass('red');
            }
        }
    });
    return false;
});

/**
 * Parameter getter from the URI:
 * @param name
 * @returns {Array|{index: number, input: string}|string}
 */
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/**
 * Add video id to the form field.
 */
$(document).ready(function() {
    $('#vIdInput').val(getParameterByName("vId"));

    $('#txt').keyup(function () {
        $('#numChars').html($(this).val().length);
    });
});
