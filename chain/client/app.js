// Wait for the page to load
document.addEventListener("DOMContentLoaded", async () => {
  if (window.ethereum) {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:7545")
    ); // Ganache's default RPC URL

    // Contract ABI (replace with your contract's ABI)
    const contractAbi = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "walletAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        name: "CompanyAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "company1",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "company2",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "isPartnership",
            type: "bool",
          },
        ],
        name: "EcosystemUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "includer",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "includee",
            type: "address",
          },
        ],
        name: "Exclude",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "includer",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "includee",
            type: "address",
          },
        ],
        name: "Include",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "observer",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "includedCompany",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "otherParty",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "included",
            type: "bool",
          },
        ],
        name: "IncludeeStatusUpdate",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "companies",
        outputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "walletAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "profilePhoto",
            type: "string",
          },
          {
            internalType: "bool",
            name: "hasToken",
            type: "bool",
          },
          {
            internalType: "string",
            name: "tokenName",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "companyAddresses",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "ecoMapping",
        outputs: [
          {
            internalType: "bool",
            name: "includesInEco",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "removedTimestamp",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_profilePhoto",
            type: "string",
          },
          {
            internalType: "bool",
            name: "_hasToken",
            type: "bool",
          },
          {
            internalType: "string",
            name: "_tokenName",
            type: "string",
          },
        ],
        name: "addCompany",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_company2",
            type: "address",
          },
          {
            internalType: "bool",
            name: "_includesInEco",
            type: "bool",
          },
        ],
        name: "updateEcosystem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "totalCompanies",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
        ],
        name: "companyAddressAtIndex",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_company1",
            type: "address",
          },
          {
            internalType: "address",
            name: "_company2",
            type: "address",
          },
        ],
        name: "getInclusionInfo",
        outputs: [
          {
            internalType: "bool",
            name: "includesInEco",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "removedTimestamp",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
    ];
    // Contract address (replace with your contract's address)
    const contractAddress = "0x3F8385263FbE3d66e7242Bd669a46b1269fe6ADE";

    // Initialize contract instance
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    // Get the connected Ethereum account
    const accounts = await web3.eth.getAccounts();
    const account = accounts[2];

    // Function to navigate to the index.html page
    function navigateToIndexPage() {
      window.location.href = "index.html";
    }

    // Function to navigate to the companies.html page
    function navigateToCompaniesPage() {
      window.location.href = "companies.html";
    }

    // Function to navigate to the create-eco-inclusion.html page
    function navigateToCreateEcoInclusion() {
      window.location.href = "create-eco-inclusion.html";
    }

    // Function to navigate to the trust-statistics.html page
    function navigateToEcoStatsPage() {
      window.location.href = "eco-statistics.html";
    }

    // Function to navigate to the events.html page
    function navigateToEventsPage() {
      window.location.href = "events.html";
    }

    // Add event listeners to the buttons for navigation
    const indexPageButton = document.getElementById("indexPageButton");
    const companiesPageButton = document.getElementById("companiesPageButton");
    const ecoInclusionPageButton = document.getElementById(
      "ecoInclusionPageButton"
    );
    const ecoStatsPageButton = document.getElementById("ecoStatsPageButton");
    const eventsPageButton = document.getElementById("eventsPageButton");

    indexPageButton.addEventListener("click", navigateToIndexPage);
    companiesPageButton.addEventListener("click", navigateToCompaniesPage);
    ecoInclusionPageButton.addEventListener(
      "click",
      navigateToCreateEcoInclusion
    );
    ecoStatsPageButton.addEventListener("click", navigateToEcoStatsPage);
    eventsPageButton.addEventListener("click", navigateToEventsPage);

    // Check if the current page is companies.html and display companies if so
    if (window.location.pathname.endsWith("companies.html")) {
      displayCompanies(); // Call the function to display companies
    }

    // Trust Statistics
    if (window.location.pathname.endsWith("eco-statistics.html")) {
      displayEcoStatistics();
    }

    // Function to display the list of companies on the companies.html page
    async function displayCompanies() {
      const companyListElement = document.getElementById("companyList"); // Get the element to display companies

      try {
        // Fetch the list of companies from your smart contract
        const totalCompanies = await contract.methods.totalCompanies().call();

        // Clear the existing content of the element
        companyListElement.innerHTML = "";

        for (let i = 0; i < totalCompanies; i++) {
          const companyAddress = await contract.methods
            .companyAddressAtIndex(i)
            .call();

          const companyInfo = await contract.methods
            .companies(companyAddress)
            .call();

          // Create a div to display company information
          const companyDiv = document.createElement("div");
          companyDiv.textContent = `Company Address: ${companyInfo.walletAddress}, Company Name: ${companyInfo.name}, Token Name: ${companyInfo.tokenName}`;
          companyListElement.appendChild(companyDiv);

          // Fetch trust information between this company and the current account
          const ecoInfo = await contract.methods
            .ecoMapping(account, companyInfo.walletAddress)
            .call();

          // Display trust information
          const ecoDiv = document.createElement("div");
          ecoDiv.textContent = `Ecosystem inclusion of ${companyInfo.name}: ${
            ecoInfo.includesInEco ? "Yes" : "No"
          }`;
          companyListElement.appendChild(ecoDiv);
        }
      } catch (error) {
        // Handle error (you can display an error message)
        console.error("Error displaying companies:", error);
      }
    }

    // Function to create trust to another company
    async function createEcoInclusion(companyAddress) {
      try {
        // Call the updateEcosystem function in the smart contract to create trust
        await contract.methods
          .updateEcosystem(companyAddress, true)
          .send({ from: account, gas: 2000000 });

        // Handle success (you can display a success message)
        console.log("Added to Eco successfully");
      } catch (error) {
        // Handle error (you can display an error message)
        console.error("Error adding to Eco:", error);
      }
    }

    // New function to revoke trust
    async function revokeEcoInclusion(companyAddress) {
      try {
        // Call the updateEcosystem function in the smart contract to revoke trust
        await contract.methods
          .updateEcosystem(companyAddress, false) // false to indicate trust revocation
          .send({ from: account, gas: 2000000 });

        // Handle success (you can display a success message)
        console.log("Exclusion successfully");
      } catch (error) {
        // Handle error (you can display an error message)
        console.error("Error excluding:", error);
      }
    }

    // Check if the current page is create-eco-inclusion.html
    if (window.location.pathname.endsWith("create-eco-inclusion.html")) {
      const createEcoInclusionForm = document.getElementById(
        "createEcoInclusionForm"
      );
      const revokeEcoInclusionForm = document.getElementById(
        "revokeEcoInclusionForm"
      );

      createEcoInclusionForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const companyAddress = document.getElementById("companyAddress").value;

        // Call the createEcoInclusion function to create trust to the specified company
        await createEcoInclusion(companyAddress);
      });
      revokeEcoInclusionForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const companyAddress = document.getElementById(
          "revokeCompanyAddress"
        ).value;
        await revokeEcoInclusion(companyAddress); // new function to revoke trust
      });
    }

    // Ensure this function is called only on the events.html page
    if (window.location.pathname.endsWith("events.html")) {
      async function fetchAndDisplayEvents() {
        try {
          // Fetch historical CompanyAdded events
          const companyAddedEvents = await contract.getPastEvents(
            "CompanyAdded",
            { fromBlock: 0, toBlock: "latest" }
          );
          updateEventDisplay("companyAddedEventContainer", companyAddedEvents);

          // Fetch historical Include events
          const IncludeEvents = await contract.getPastEvents("Include", {
            fromBlock: 0,
            toBlock: "latest",
          });
          updateEventDisplay("IncludeEventContainer", IncludeEvents);

          // Fetch historical Exclude events
          const ExcludeEvents = await contract.getPastEvents("Exclude", {
            fromBlock: 0,
            toBlock: "latest",
          });
          updateEventDisplay("ExcludeEventContainer", ExcludeEvents);

          // Fetch historical IncludeeStatusUpdate events
          const ecoChangedEvents = await contract.getPastEvents(
            "IncludeeStatusUpdate",
            { fromBlock: 0, toBlock: "latest" }
          );
          updateEventDisplay(
            "IncludeeStatusUpdateEventContainer",
            ecoChangedEvents
          );
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }

      function updateEventDisplay(containerId, events) {
        const container = document.getElementById(containerId);
        events.forEach((event) => {
          const eventElement = document.createElement("div");
          eventElement.className = "event";
          eventElement.textContent = JSON.stringify(
            event.returnValues,
            null,
            2
          );
          container.appendChild(eventElement);
        });
      }

      fetchAndDisplayEvents();
    }

    try {
      // Request account access
      await window.ethereum.enable();

      // Form submission event listener
      const companyForm = document.getElementById("companyForm");
      companyForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const profilePhoto = document.getElementById("profilePhoto").value;
        const hasToken = document.getElementById("hasToken").checked;
        const tokenName = document.getElementById("tokenName").value;

        try {
          // Call the addCompany function in the smart contract
          await contract.methods
            .addCompany(name, profilePhoto, hasToken, tokenName)
            .send({ from: account, gas: 2000000 });

          // Handle success (you can display a success message)
          console.log("Company added successfully");
        } catch (error) {
          // Handle error (you can display an error message)
          console.error("Error adding company:", error);
        }
      });
    } catch (error) {
      console.error("User denied account access:", error);
    }

    async function updateEcoStatisticsOnPage(
      inclusion_given,
      inclusion_received,
      allInclusions
    ) {
      // Find the company address with the most trusts given and received
      const mostInclusionsGivenCompanyAddress = Object.keys(
        inclusion_given
      ).reduce((a, b) => (inclusion_given[a] > inclusion_given[b] ? a : b));

      const mostInclusionsReceivedCompanyAddress = Object.keys(
        inclusion_received
      ).reduce((a, b) =>
        inclusion_received[a] > inclusion_received[b] ? a : b
      );

      // Fetch the company names using the addresses
      const mostInclusionsGivenCompanyName = await contract.methods
        .companies(mostInclusionsGivenCompanyAddress)
        .call()
        .then((company) => company.name);
      const mostInclusionsReceivedCompanyName = await contract.methods
        .companies(mostInclusionsReceivedCompanyAddress)
        .call()
        .then((company) => company.name);

      // Update HTML for Most Trusts Given
      document.getElementById(
        "mostInclusionsGiven"
      ).innerText = `Company Name: ${mostInclusionsGivenCompanyName} (Address: ${mostInclusionsGivenCompanyAddress}), Inclusion Given: ${inclusion_given[mostInclusionsGivenCompanyAddress]}`;

      // Update HTML for Most Trusts Received
      document.getElementById(
        "mostInclusionsReceived"
      ).innerText = `Company Name: ${mostInclusionsReceivedCompanyName} (Address: ${mostInclusionsReceivedCompanyAddress}), Inclusions Received: ${inclusion_received[mostInclusionsReceivedCompanyAddress]}`;

      // Update HTML for All Trusts List
      const allInclusionsList = document.getElementById("allInclusionsList");
      allInclusionsList.innerHTML = "";
      allInclusions.forEach((inclusion_given) => {
        let listItem = document.createElement("li");
        listItem.innerText = inclusion_given;
        allInclusionsList.appendChild(listItem);
      });
    }
    // Add this function at the end of your app.js file
    async function displayEcoStatistics() {
      const totalCompanies = await contract.methods.totalCompanies().call();
      let ecoInclusionGivenCount = {};
      let ecoInclusionReceivedCount = {};
      let allEcoInclusions = [];

      for (let i = 0; i < totalCompanies; i++) {
        const companyAddress = await contract.methods
          .companyAddressAtIndex(i)
          .call();
        const companyName = await contract.methods
          .companies(companyAddress)
          .call()
          .then((company) => company.name);

        ecoInclusionGivenCount[companyAddress] = 0;
        ecoInclusionReceivedCount[companyAddress] = 0;

        for (let j = 0; j < totalCompanies; j++) {
          if (i !== j) {
            const otherCompanyAddress = await contract.methods
              .companyAddressAtIndex(j)
              .call();
            const otherCompanyName = await contract.methods
              .companies(otherCompanyAddress)
              .call()
              .then((company) => company.name);
            const ecoInfo = await contract.methods
              .getInclusionInfo(companyAddress, otherCompanyAddress)
              .call();

            if (ecoInfo.includesInEco) {
              ecoInclusionGivenCount[companyAddress]++;
              ecoInclusionReceivedCount[otherCompanyAddress]++;
              allEcoInclusions.push(
                `${companyName} (${companyAddress}) includes ${otherCompanyName} (${otherCompanyAddress})`
              );
            }
          }
        }
      }

      updateEcoStatisticsOnPage(
        ecoInclusionGivenCount,
        ecoInclusionReceivedCount,
        allEcoInclusions
      );
    }
  } else {
    console.error(
      "Web3 not detected. Please install MetaMask or another Ethereum wallet extension."
    );
  }
});
