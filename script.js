const launchDate = new Date("Mar 1, 2023 00:00:00").getTime();
console.log(launchDate);

let timer = setInterval(CountTime, 1000);
function CountTime() {
  let currentDate = new Date().getTime();

  //Distance between the launch date and the currendDate
  let distance = launchDate - currentDate;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  if (distance < 0) {
    //Launch date has reached!!
    clearInterval(x);

    document.getElementById("notify").innerHTML = "The website has launched!";

    sendEmails();
  }
}

//Email Function

const sendEmails = () => {
  // Get the list of subscribers from local storage
  var subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

  // Loop through the subscribers and send an email to each one
  for (var i = 0; i < subscribers.length; i++) {
    // Use your email service provider's API to send the email
    // Here's an example using the EmailJS API:
    emailjs
      .send("service_1xbokqm", "service_1xbokqm", {
        to_email: subscribers[i],
        from_name: "Timothy",
        message:
          "The website has launched! Visit it now at https://www.macgroup.com",
      })
      .then(
        function (response) {
          console.log("Email sent to " + subscribers[i]);
        },
        function (error) {
          console.log("Error sending email to " + subscribers[i]);
        }
      );
  }
  localStorage.removeItem("subscribers");
};

// Subscribe function
function subscribe() {
  // Get the email input element and value
  var emailInput = document.getElementById("email");
  var email = emailInput.value;

  console.log(email);

  // Get the list of subscribers from local storage
  var subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

  // Check if the email is already subscribed
  if (subscribers.includes(email)) {
    alert("This email is already subscribed.");
    return false;
  }

  // Add the email to the list of subscribers and save to local storage
  subscribers.push(email);
  localStorage.setItem("subscribers", JSON.stringify(subscribers));

  // Update the response message and clear the email input
  alert("Thank you for subscribing");
}
