// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

contract GetEcosystemOfCompanyConsumer is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    // State variables to store the last request ID, response, and error
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    // Custom error type
    error UnexpectedRequestID(bytes32 requestId);

    // Event to log responses
    event Response(
        bytes32 indexed requestId,
        string ecos,
        bytes response,
        bytes err
    );

    // Router address - Hardcoded for Mumbai
    // Check to get the router address for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    address router = 0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C;

    // JavaScript source code
    //string source = "const address = args[0]; const apiResponse = await Functions.makeHttpRequest({ url: 'https://api.studio.thegraph.com/proxy/60955/ecosynctest2/v0.0.1', method: 'POST', data: { query: `{ ecos(first: 5) { id company1Address company2Address } }` } }); if (apiResponse.error) { throw Error('Request failed'); } const { data: { data: { ecos } } } = apiResponse; return Functions.encodeString(JSON.stringify(ecos, null, 2));";
    string source =
        "const account = args[0]"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://api.studio.thegraph.com/query/60955/ecosynctest2/version/latest`,"
        "method: `POST`,"
        "data: { query: `{ ecos(where: { isIncluded: true }) { id company1Address company2Address } }` },"
        "})"
        "if (apiResponse.error) {"
        "throw Error('Request failed')"
        "}"
        "const { data: { data: { ecos } } } = apiResponse;"
        "const getNeighbors = (address) => ecos.map(e => e.company1Address === address ? e.company2Address : e.company2Address === address ? e.company1Address : null).filter(x => !!x);"
        "const myNeighbors = getNeighbors(account);"
        "const getIntersectionCount = (other) => {"
        "const othersNeighbors = getNeighbors(other);"
        "return othersNeighbors.filter(a => myNeighbors.includes(a)).length;"
        "}"
        "const allCompanies = ecos.reduce((acc, cur) => {"
        "if (!acc.includes(cur.company1Address)) {"
        "acc.push(cur.company1Address);"
        "}"
        "if (!acc.includes(cur.company2Address)) {"
        "acc.push(cur.company2Address);"
        "}"
        "return acc;"
        "}, []);"
        "let argmax = '0x0';"
        "let max = -1;"
        "for (const other of allCompanies) {"
        "if (account === other) continue;"
        "if (myNeighbors.includes(other)) continue;"
        "const intersectionCount = getIntersectionCount(other);"
        "if (intersectionCount > max) {"
        "max = intersectionCount;"
        "argmax = other;"
        "}"
        "}"
        "if (max <= 0) {"
        "argmax = '0x0';"
        "}"
        "return Functions.encodeString(argmax)";

    // Callback gas limit
    uint32 gasLimit = 300000;

    // donID - Hardcoded for Mumbai
    // Check to get the donID for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    bytes32 donID =
        0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000;

    // State variable to store the returned ecos information
    string public ecos;

    /**
     * @notice Initializes the contract with the Chainlink router address and sets the contract owner
     */
    constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    /**
     * @notice Sends an HTTP request for ecos information
     * @param subscriptionId The ID for the Chainlink subscription
     * @param args The arguments to pass to the HTTP request
     * @return requestId The ID of the request
     */
    function sendRequest(
        uint64 subscriptionId,
        string[] calldata args
    ) external onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        return s_lastRequestId;
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        ecos = string(response);
        s_lastError = err;

        // Emit an event to log the response
        emit Response(requestId, ecos, s_lastResponse, s_lastError);
    }
}
