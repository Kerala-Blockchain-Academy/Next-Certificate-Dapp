// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Cert {
    address admin;

    event Issued(uint, string);
    event Uploaded(uint, bytes);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Access Denied");
        _;
    }

    struct Certificate {
        string name;
        string course;
        string grade;
        string date;
    }

    mapping(uint => Certificate) public Certificates;
    mapping(uint => bytes) public Documents;

    function issueCertificate(
        uint _id,
        string memory _name,
        string memory _course,
        string memory _grade,
        string memory _date
    ) public onlyAdmin {
        Certificates[_id] = Certificate(_name, _course, _grade, _date);
        emit Issued(_id, _date);
    }

    function uploadDocument(uint _id, bytes memory _hash) public onlyAdmin {
        Documents[_id] = _hash;
        emit Uploaded(_id, _hash);
    }
}
