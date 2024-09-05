jQuery(document).ready(function($) {

    // Function to fetch event dates and initialize datepicker
    function highlightEventDates() {
        $.ajax({
            type: 'POST',
            url: cpf_ajax_object.ajax_url,
            data: {
                action: 'cpf_get_event_dates'
            },
            success: function(response) {
                console.log('AJAX Success:', response); // Check if the success callback is called
                if (response.success) {
                    var eventDates = response.data;
                    console.log('Event dates received:', eventDates); // Check received dates
                    initializeDatepicker(eventDates); // Initialize datepicker with received dates
                } else {
                    console.error("No event dates returned.");
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX request failed. Status:", status, "Error:", error);
            }
        });
    }

    
    
    function initializeDatepicker(eventDates) {
        $('#cpf-small-calendar').datepicker({
            beforeShowDay: function(date) {
                var formattedDate = $.datepicker.formatDate('yy-mm-dd', date);
                var isEventDate = eventDates.indexOf(formattedDate) !== -1;
                console.log('Checking date:', formattedDate, 'Is event date:', isEventDate);
                return [true, isEventDate ? 'highlight-event' : ''];
            },
            onSelect: function(dateText) {
                $.ajax({
                    type: 'POST',
                    url: cpf_ajax_object.ajax_url,
                    data: {
                        action: 'cpf_filter_posts_events',
                        selected_date: dateText
                    },
                    success: function(response) {
                        if (response.success) {
                            $('#cpf-posts-events').html(response.data);
                        } else {
                            $('#cpf-posts-events').html('<p>No events found for this date.</p>');
                        }
                    }
                });
            }
        });
    }
    
    
    

    // Initialize the calendar and highlight event dates
    highlightEventDates();
});




// function highlightEventDates() {
//     $.ajax({
//         type: 'POST',
//         url: cpf_ajax_object.ajax_url,
//         data: {
//             action: 'cpf_get_event_dates'
//         },
//         success: function(response) {
//             if (response.success) {
//                 var eventDates = response.data;

//                 // Initialize the datepicker after receiving the event dates
//                 $('#cpf-small-calendar').datepicker({
//                     beforeShowDay: function(date) {
//                         var formattedDate = $.datepicker.formatDate('yy-mm-dd', date);
//                         if (eventDates.indexOf(formattedDate) !== -1) {
//                             return [true, 'highlight-event'];  // Apply highlight class
//                         } else {
//                             return [true, ''];
//                         }
//                     },
//                     onSelect: function(dateText) {
                        
//                             // Handle date selection and AJAX request
//                             $.ajax({
//                                 type: 'POST',
//                                 url: cpf_ajax_object.ajax_url,
//                                 data: {
//                                     action: 'cpf_filter_posts_events',
//                                     selected_date: dateText
//                                 },
//                                 success: function(response) {
//                                     if (response.success) {
//                                         $('#cpf-posts-events').html(response.data);
//                                     } else {
//                                         $('#cpf-posts-events').html('<p>No events found for this date.</p>');
//                                     }
//                                 }
//                             });
//                         }
//                     });
// console.log(response.data);

//                 } else {
//                     console.error("No event dates returned.");
//                 }
//             },
//             error: function() {
//                 console.error("AJAX request failed.");
//             }
//         });
//     }

//     // Initialize the calendar and highlight event dates
//     highlightEventDates();
// });
