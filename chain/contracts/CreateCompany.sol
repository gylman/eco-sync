// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CompanyRegistry {
    struct Company {
        string name;
        address walletAddress;
        string profilePhoto;
        string tokenName;
        string description;
    }

    struct Eco {
        bool includesInEco;
        uint256 createdTimestamp;
        uint256 removedTimestamp;
    }

    mapping(address => Company) public companies;
    mapping(address => mapping(address => Eco)) public ecoMapping;
    address[] public companyAddresses;

    // Events
    event CompanyAdded(address indexed walletAddress, string name, string profilePhoto, string tokenName, string description);
    event EcosystemUpdated(address indexed company1, address indexed company2, bool isPartnership);

    function addCompany(
        string memory _name,
        string memory _profilePhoto,
        string memory _tokenName,
        string memory _description
    ) external {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(companies[msg.sender].walletAddress == address(0), "You already have a company");

        Company storage newCompany = companies[msg.sender];
        newCompany.name = _name;
        newCompany.walletAddress = msg.sender;
        newCompany.profilePhoto = _profilePhoto;
        newCompany.tokenName = _tokenName;
        newCompany.description = _description;

        companyAddresses.push(msg.sender);
        emit CompanyAdded(msg.sender, _name, _profilePhoto, _tokenName, _description);
    }

    function updateEcosystem(address _company2, bool  _includesInEco) external {
        require(companies[msg.sender].walletAddress != address(0), "Company not registered");
        require(companies[_company2].walletAddress != address(0), "Company 2 not registered");
        require(msg.sender != _company2, "A company cannot include itself");

        Eco storage record = ecoMapping[msg.sender][_company2];

        if (_includesInEco) {
            require(!record.includesInEco, "Already added to Ecosystem");
            record.includesInEco = true;
            record.createdTimestamp = block.timestamp;
        } else {
            require(record.includesInEco, "Company is not in your ecosystem");
            record.includesInEco = false;
            record.removedTimestamp = block.timestamp;
        }

        emit EcosystemUpdated(msg.sender, _company2,  _includesInEco);
    }

    function totalCompanies() external view returns (uint) {
        return companyAddresses.length;
    }

    function companyAddressAtIndex(uint index) external view returns (address) {
        require(index < companyAddresses.length, "Index out of bounds");
        return companyAddresses[index];
    }

    function getInclusionInfo(address _company1, address _company2) external view returns (bool includesInEco, uint256 createdTimestamp, uint256 removedTimestamp) {
        Eco storage record = ecoMapping[_company1][_company2];
        return (record.includesInEco, record.createdTimestamp, record.removedTimestamp);
    }
}
