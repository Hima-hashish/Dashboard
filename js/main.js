// Create the widget status object
let widgetsStatus = {
  draft: true,
  target: true,
  static: true,
  news: true,
  tasks: true,
  items: true,
};

// update local storage function
function updateLocalStorage(obj) {
  // Set the local storage item and the value
  window.localStorage.setItem("widgetsControl", JSON.stringify(obj));
}

// Start Header
// Catch Elements
let notifications = document.querySelector("header .second i");
notifications.style.cursor = "pointer";

// Handle the notification icon
notifications.addEventListener("click", function () {
  // Check if the notification container is exists
  if (document.querySelector(".notificationContainer")) {
    // Remove the notification container
    document.querySelector(".notificationContainer").remove();
  } else {
    // Create the notification container Elements
    let parent = document.createElement("div"),
      cancelBtn = document.createElement("button"),
      notOne = document.createElement("div"),
      notOneText = document.createTextNode("Welcome To The Dashboard");

    // Add cancel button content
    cancelBtn.innerHTML = "x";

    // Handle the cancel button
    cancelBtn.addEventListener("click", function () {
      // Remove the notification container
      document.querySelector(".notificationContainer").remove();
    });

    // Add class to the notification container
    parent.classList.add("notificationContainer");

    // Add style to elements
    parent.style.cssText = `position: absolute; top: 75px; right: 16px; background-color: cadetblue; padding: 10px 5px; height: 170px; border-radius: 10px;`;
    cancelBtn.style.cssText = `cursor: pointer; width: 25px; border: none; height: 25px; background-color: red; border-radius: 50%; font-size: 18px; font-weight: bold; position: absolute; top: -10px; right: -10px; color: white;`;
    notOne.style.cssText = `background-color: deepskyblue; margin-top: 5px; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 5px;`;

    // Append elements in notification container
    notOne.appendChild(notOneText);
    parent.appendChild(cancelBtn);
    parent.appendChild(notOne);

    // Add notification container to page
    document.body.appendChild(parent);
  }
});

// End Header

// Get the page title
let pageTitle = document.title.toLowerCase();

// Check the page
if (pageTitle === "dashboard") {
  // Handle the widgit from the setting page
  if (window.localStorage.getItem("widgetsControl")) {
    // Convert the local storage value (javascript object notation) to javascript object value
    let widgetsControl = JSON.parse(
      window.localStorage.getItem("widgetsControl")
    );
    // Catch all widgets
    let widgets = document.querySelectorAll(
      "main .content .main-content section.cont"
    );
    // Loop on the widgets
    widgets.forEach((widget) => {
      // Check widget visibility
      if (widgetsControl[widget.id] === true) {
        // Add display block
        widget.style.display = "block";
      } else {
        // Add display none
        widget.style.display = "none";
      }
    });
  }

  // Start Tasks
  // Catch Elements
  let tasks = document.querySelectorAll(".tasks .task > span i");
  // Loop on taskss
  tasks.forEach((task) => {
    // Handle to remove the task on click
    task.addEventListener("click", function () {
      this.parentElement.parentElement.remove();
    });
  });
  // End Tasks
  // Start Posts
  // Catch Elements
  let postLikes = document.querySelector(".posts .postLike"),
    postLikesCount = document.querySelector(".posts .postLikeCount");
  postLikes.addEventListener("click", function () {
    // Check if the user click before or no
    if (postLikes.style.color !== "red") {
      // Add style
      postLikes.style.color = "red";
      // Increament the post likes
      postLikesCount.textContent = ++postLikesCount.textContent;
    } else {
      // Set the color to the initial
      postLikes.style.color = "";
      // Decreament the post liks
      postLikesCount.textContent = --postLikesCount.textContent;
    }
  });
  // End Posts
} else if (pageTitle === "settings") {
  // Start Info
  // Catch the elemente
  let email = document.querySelector(".info form .email input"),
    changeBtn = document.querySelector(".info form .email button");

  // Handle the button
  changeBtn.onclick = function (e) {
    // Cancel the initial event
    e.preventDefault();
    // Check change or submit
    if (changeBtn.textContent.toLowerCase() === "change") {
      // Change the button content
      changeBtn.textContent = "Submit";
      // Change the disabled attribute value
      email.disabled = false;
      // Change the email style
      email.style.cssText = `background-color: initial; color: initial; cursor: initial;`;
    } else {
      // Reset everything to the initial but the email content
      changeBtn.textContent = "Change";
      email.disabled = true;
      email.style.cssText = ``;
    }
    // End Info
  };
  // Start Control
  // Catch elements
  let widget = document.querySelectorAll(".widgets ul li input");
  // Handle the widgit settings from the local storage
  if (window.localStorage.getItem("widgetsControl")) {
    // Convert the javascript object notation to javascript object value
    let weds = JSON.parse(window.localStorage.getItem("widgetsControl"));
    widgetsStatus = weds;
    // Loop to handle the settings
    widget.forEach((wed) => {
      // Check if the widget visibility
      if (weds[wed.id] === true) {
        // Change the checked status of the widget
        wed.checked = true;
      } else {
        wed.checked = false;
      }
    });
  }
  // loop on the widget
  widget.forEach((wed) => {
    // Handle the click event
    wed.addEventListener("click", function () {
      // Check if the widget is checked or not
      if (this.checked) {
        // change the widget status
        widgetsStatus[this.id] = true;
        // update the the widget status in local storage
        updateLocalStorage(widgetsStatus);
      } else {
        // change the widget status
        widgetsStatus[this.id] = false;
        updateLocalStorage(widgetsStatus);
      }
    });
  });
  // End Control
} else if (pageTitle === "profile") {
  // Start profile
  // Catch elements
  let theInputs = document.querySelectorAll(".content .info ul li > div input");
  // Loop on the inputs
  theInputs.forEach((input) => {
    // Handle the click
    input.addEventListener("click", () => {
      // Catch the info
      let theInfo =
        input.parentElement.parentElement.querySelectorAll(".theInfo");
      // Check if the input is checked
      if (input.checked === true) {
        // Loop on the info
        theInfo.forEach((info) => {
          // Add display flex to show the info
          info.style.display = "flex";
        });
      } else {
        // Loop on the info
        theInfo.forEach((info) => {
          // Add display none to hide the info
          info.style.display = "none";
        });
      }
    });
  });
  // End profile
} else if (pageTitle === "friends") {
  // Catch elements
  let removeBtns = document.querySelectorAll(
    ".content .main-content .friend .control .links .rmBtn"
  );

  // Loop on the remove buttons
  removeBtns.forEach((btn) => {
    // Add style to the button
    btn.style.cssText = "border: none; cursor: pointer; padding: 5.5px 10.3px;";
    // Handle the click event to remove the friend on click
    btn.addEventListener("click", function () {
      // Get the parent of the button container
      let parent = btn.parentElement.parentElement.parentElement;
      // Remove the parent
      parent.remove();
    });
  });
}
