/*The [Fullstack Convention Center](https://fsa-crud-2aa9294fe819.herokuapp.com/api) 
hosts a variety of events, from small meetings to large galas. Build a web application 
so visitors can get the latest information on upcoming events.

Read the [API documentation](https://fsa-crud-2aa9294fe819.herokuapp.com/api/#tag/Events). 
You will be working mainly with the `/events` endpoints. */

//State
let parties = [];
let a_party = null;

//Edit the HTML a bit
const appBody = document.querySelector("#app");
const partyList = document.createElement("div");
partyList.id = "dataList";
appBody.append(partyList);
const individualParty = document.createElement("div");
individualParty.id = "individual";
appBody.append(individualParty);
const titleHeader = document.createElement("div");
titleHeader.id = "title";
titleHeader.innerHTML = `<h1>Party Planner</h1>`;
document.body.prepend(titleHeader);
const columnNamesContainer = document.createElement("div");
columnNamesContainer.id = "columnNames";
titleHeader.insertAdjacentElement("afterend", columnNamesContainer);
columnNamesContainer.innerHTML = `<div id=theList><h2>Upcoming Parties</h2></div><div id=theData><h2>Party Details</h2></div>`;

//Fetch the full list of data and make it available in state array parties
const fetchParties = async () => {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2605-FTB-ET-WEB-FT/events",
    );
    const { data } = await response.json();
    parties = data;
  } catch (error) {
    console.log(error);
  }
};

//Fetch single party based on the id from the dataset of the element that is clicked on
const fetchParty = async (id) => {
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2605-FTB-ET-WEB-FT/events/${id}`,
    );
    const { data } = await response.json();
    a_party = data;
  } catch (error) {
    console.log(error);
  }
};

//Listen for on the dynamically rendered list of party names
partyList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("partyName")) {
    console.log("YES!!!");
    await fetchParty(event.target.dataset.partyid);
    render();
  }
});

//Render the HTML to the page
const render = () => {
  const html = parties.map((party) => {
    return `<p class="partyName" data-partyid=${party.id}>${party.name}</p>`;
  });
  partyList.innerHTML = html.join("");
  if (!a_party) {
    individualParty.innerHTML = "Click on a party to view!";
  } else {
    individualParty.innerHTML = `
        <div id=individual>
            
            <h3>${a_party.name}</h3>
            <p>
                ${a_party.description}
            </p>
        </div>
      `;
  }
};

//This starts the ball rolling
const initialize = async () => {
  await fetchParties();
  render();
};

initialize();
