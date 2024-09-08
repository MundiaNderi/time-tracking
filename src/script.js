// Fetch the data from the local JSON file
fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
        // DOM Elements
        const dailyBtn = document.getElementById("daily");
        const weeklyBtn = document.getElementById("weekly");
        const monthlyBtn = document.getElementById("monthly");
        const contentGrid = document.getElementById("content-grid");

        // Timeframe mapping
        const timeframeLabels = {
            daily: "Daily Record",
            weekly: "Week",
            monthly: "Month"
        };

        // Function to update content based on timeframe
        function updateContent(timeframe) {
            // Clear existing content
            contentGrid.innerHTML = "";

            // Loop through data and create HTML elements dynamically
            data.forEach((item) => {
                const { title, timeframes } = item;
                const currentHours = timeframes[timeframe].current;
                const previousHours = timeframes[timeframe].previous;

                // Determine the background class based on the title
                let backgroundClass = "";
                let titleClass = title.toLowerCase().replace(/\s/g, '');

                if (title === "Work") {
                    backgroundClass = "bg-lightRedWork";
                } else if (title === "Play") {
                    backgroundClass = "bg-softBlue";
                } else if (title === "Study") {
                    backgroundClass = "bg-lightRed";
                } else if (title === "Exercise") {
                    backgroundClass = "bg-limeGreen";
                } else if (title === "Social") {
                    backgroundClass = "bg-violet";
                } else if (title === "Self Care") {
                    backgroundClass = "bg-softOrange";
                }

                // Create new content block for each category
                const contentBlock = `
                    <div class="relative bg-darkBlue rounded-md overflow-hidden">
                        <div class="absolute ${titleClass} ${backgroundClass} top-0 left-0 w-full h-8 rounded-t-md"></div>
                        <div class="relative p-4 cursor-pointer hover:bg-desaturatedBlue mt-8">
                            <div class="flex justify-between items-center">
                                <p class="text-white font-Rubik">${title}</p>
                                <img src="/images/icon-ellipsis.svg" alt="icon-ellipsis" class="w-1/6 cursor-pointer h-1/6" />
                            </div>
                            <div class="details flex-col md:flex-row">
                                <h2 class="text-white py-2 font-Rubik">${currentHours} Hours</h2>
                                <p class="text-desaturatedBlue hover:text-white font-Rubik">Last ${timeframeLabels[timeframe]} - ${previousHours} hours</p>
                            </div>
                        </div>
                    </div>
                `;

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
