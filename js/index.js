console.log("Inside index.js");

AOS.init({
  offset: 180,
  duration: 800,
});

getJobs().then((data) => {
  showJobs(data);
});

document.querySelector(".button-container").addEventListener("click", () => {
  let text = document.getElementById("filter-jobs").value;
  getJobs().then((data) => {
    let filteredJobs = filterJobs(data, text.toLowerCase());
    showJobs(filteredJobs);
  });
});

function getJobs() {
  return fetch("data.json")
    .then((respone) => respone.json())
    .then((data) => {
      return data;
    });
}

function showJobs(jobs) {
  console.log("Jobs from show");

  const searchRes = document.querySelector("#search-result");
  const jobsContainer = document.querySelector(".jobs-container");
  let allJobsHTML = "";

  jobs.forEach((singleJob) => {
    // data-aos="fade-in" add in div for animation
    allJobsHTML += `
        <div class="job-tile">
            <div class="top">
                <img
                    alt="job-logo"
                    src="${singleJob.logo}"
                />
                <span class="material-icons more_horiz">more_horiz</span>
            </div>

            <div class="role-name">
            <span>${singleJob.roleName}</span>
            </div>

            <div class="description">
                <span>
                ${singleJob.requirements.content}
                <span/>
            </div>

            <div class="buttons">
                <div class="button apply-now">Apply Now</div>
                <div class="button">Message</div>
            </div>
        </div>
      `;
  });
  const resultLength = jobs.length;
  let message = ` ${resultLength} Jobs found !!`;
  if (resultLength == 0) {
    message = "No result found !!";
  }
  searchRes.innerHTML = message;
  jobsContainer.innerHTML = allJobsHTML;
}

function filterJobs(jobs, searchText) {
  if (searchText) {
    let filteredJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.requirements.content.toLowerCase().includes(searchText)
      ) {
        return true;
      }
      return false;
    });
    return filteredJobs;
  } else {
    return jobs;
  }
}
