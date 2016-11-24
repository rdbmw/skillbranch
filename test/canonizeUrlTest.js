import { describe, it } from 'mocha';
import { expect } from 'chai';
import canonize from '../src/lesson1/canonize';

describe('canonize', () => {

  const successfulTestCases = [
    { url: 'http://telegram.me/skillbranch/prof', username: '@skillbranch' },
    { url: 'http://telegram.me/skillbranch', username: '@skillbranch' },
    { url: 'http://telegram.me/skillbranch/', username: '@skillbranch' },
    { url: 'http://telegram.com/skillbranch', username: '@skillbranch' },
    { url: 'https://telegram.com/skillbranch', username: '@skillbranch' },
    { url: 'https://TeLegram.co/skillBranch', username: '@skillBranch' },
    { url: 'https://vk.com/skillbranch', username: '@skillbranch' },
    { url: 'https://vk.com/skillbranch?name=2222', username: '@skillbranch' },
    { url: 'https://vk.com/skillbranch&name=2222', username: '@skillbranch' },
    { url: 'https://facebook.com/skillbranch', username: '@skillbranch' },
    { url: 'https://facebook.ru/skillbranch', username: '@skillbranch' },
    { url: 'https://www.twitter.com/skillbranch', username: '@skillbranch' },
    { url: 'www.twitter.com/skillbranch', username: '@skillbranch' },
    { url: 'www.twitter.com:8080/skillbranch', username: '@skillbranch' },
    { url: 'twitter.com/skillbranch', username: '@skillbranch' },
    { url: 'www.twitter.com/skillbranch', username: '@skillbranch' },
    { url: 'www.twitter.com/skill.branch', username: '@skill.branch' },
    { url: 'account.skill-branch.ru/skillbranch777', username: '@skillbranch777' },
    { url: 'localhost:3000/skillbranch', username: '@skillbranch' },
    { url: 'http://149.154.167.99:8080/skillbranch', username: '@skillbranch' },
    { url: '149.154.167.99:8080/skillbranch', username: '@skillbranch' },
    { url: '149.154.167.99/skillbranch', username: '@skillbranch' },
    { url: 'account.skill-branch.ru/1', username: '@1' },
  ];

  // const failureTestCases = [
  //   { url: 'www.twitter.com', username: '' },
  //   { url: 'https://www.twitter.com/', username: '' },
  //   { url: 'account.skill-branch.ru/@', username: '' },
  //   { url: 'account.skill-branch.ru/', username: '' },
  //   { url: '149.154.167.99', username: '' },
  //   { url: '@skill.branch', username: '' },
  //   { url: '@@skill.branch', username: '' },
  //   { url: '', username: '' },
  //   { url: '@', username: '' },
  // ];

  successfulTestCases.forEach((obj) => {
    describe(`correctly success canonize url ${obj.url}`, () => {

      it(`should be success and return ${obj.username} correctly`, () => {
        expect(canonize(obj.url)).to.be.equal(obj.username);
      });

    });
  });

  // failureTestCases.forEach((obj) => {
  //   describe(`correctly fail canonize url ${obj.url}`, () => {
  //
  //     it(`should return ${obj.username} correctly`, () => {
  //       expect(canonize(obj.url)).to.be.equal(obj.username);
  //     });
  //
  //   });
  // });

});
