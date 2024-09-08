// Fetch the data from the local JSON file
fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
        // DOM Elements
        const dailyBtn = document.getElementById("daily");
        const weeklyBtn = document.getElementById("weekly");
        const monthlyBtn = document.getElementById("monthly");
        const contentGrid = document.getElementById("content-grid");

        // Function to update content based on timeframe
        function updateContent(timeframe) {
            // Clear existing content
            contentGrid.innerHTML = "";

            // Loop through data and create HTML elements dynamically
            data.forEach((item) => {
                const { title, timeframes } = item;
                const currentHours = timeframes[timeframe].current;
                const previousHours = timeframes[timeframe].previous;

                // Create new content block for each category
                const contentBlock = `
          <div class="relative bg-darkBlue rounded-md overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-8 bg-lightRed rounded-t-md"></div>
            <div class="relative p-4 mt-8">
              <div class="flex justify-between items-center">
                <p class="text-white font-Rubik">${title}</p>
                <img src="/images/icon-ellipsis.svg" alt="icon-ellipsis" class="w-1/6 h-1/6" />
              </div>
              <div class="details flex-col md:flex-row">
                <h2 class="text-white py-2 font-Rubik">${currentHours} Hours</h2>
                <p class="text-desaturatedBlue font-Rubik">Last ${timeframe} - ${previousHours} hours</p>
              </div>
            </div>
          </div>
        `;

                // Add the class based on a Title
                if (title === "Work") {
                    <div class="absolute top-0 left-0 w-full h-10 bg-lightRedWork rounded-t-md"></div>;
                } else if (title === "Play") {
                    <div class="absolute top-0 left-0 w-full h-10 bg-softBlue rounded-t-md"></div>;
                } else if (title === "Study") {
                    <div class="absolute top-0 left-0 w-full h-10 bg-lightRed rounded-t-md"></div>;
                } else if (title === "Exercise") {
                    <div class="absolute top-0 left-0 w-full h-10 bg-limeGreen rounded-t-md"></div>;
                } else if (title === "Social") {
                    <div class="absolute top-0 left-0 w-full h-10 bg-violet rounded-t-md"></div>;
                } else if (title === " Self Care") {
                    <div class="absolute top-0 left-0 w-full h-10 bg-softOrange rounded-t-md"></div>
                }

                // Add content to the grid
                contentGrid.innerHTML += contentBlock;
            });
        }

        // Event listeners for buttons
        dailyBtn.addEventListener("click", () => updateContent("daily"));
        weeklyBtn.addEventListener("click", () => updateContent("weekly"));
        monthlyBtn.addEventListener("click", () => updateContent("monthly"));

        // Initialize with weekly data (default view)
        updateContent("weekly");
    })
    .catch((error) => {
        console.error("Error loading JSON data:", error);
    });
