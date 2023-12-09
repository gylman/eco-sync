// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CompanyRegistry {
    struct Company {
        string name;
        address walletAddress;
        string profilePhoto;
        bool hasToken;
        string tokenName;
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
    event CompanyAdded(address indexed walletAddress, string name);
    event EcosystemUpdated(address indexed company1, address indexed company2, bool isPartnership);
    event Include(address indexed includer, address indexed includee);
    event Exclude(address indexed includer, address indexed includee);
    event IncludeeStatusUpdate(address indexed observer, address indexed includedCompany, address indexed otherParty, bool included);

    function addCompany(
        string memory _name,
        string memory _profilePhoto,
        bool _hasToken,
        string memory _tokenName
    ) external {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(companies[msg.sender].walletAddress == address(0), "You already have a company");

        Company storage newCompany = companies[msg.sender];
        newCompany.name = _name;
        newCompany.walletAddress = msg.sender;
        newCompany.profilePhoto = _profilePhoto;
        newCompany.hasToken = _hasToken;
        newCompany.tokenName = _tokenName;

        companyAddresses.push(msg.sender);
        emit CompanyAdded(msg.sender, _name);
    }

    function updateEcosystem(address _company2, bool  _includesInEco) external {
        require(companies[msg.sender].walletAddress != address(0), "Company not registered");
        require(companies[_company2].walletAddress != address(0), "Company 2 not registered");
        require(msg.sender != _company2, "A company cannot include itself");

        Eco storage record = ecoMapping[msg.sender][_company2];

        if ( _includesInEco) {
            require(!record.includesInEco, "Already added to Ecosystem");
            record.includesInEco = true;
            record.createdTimestamp = block.timestamp;
            emit Include(msg.sender, _company2);
            // Notify observers that trust a company
            notifyObservers(msg.sender, _company2, true);
        } else {
            require(record.includesInEco, "Company is not in your ecosystem");
            record.includesInEco = false;
            record.removedTimestamp = block.timestamp;
            emit Exclude(msg.sender, _company2);
            // Notify observers that trust a company
            notifyObservers(msg.sender, _company2, false);
        }

        emit EcosystemUpdated(msg.sender, _company2,  _includesInEco);
    }

    function notifyObservers(address _includer, address _includee, bool _included) internal {
        for (uint i = 0; i < companyAddresses.length; i++) {
            if (ecoMapping[companyAddresses[i]][_includee].includesInEco) {
                emit IncludeeStatusUpdate(companyAddresses[i], _includee, _includer, _included);
            }
        }
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
