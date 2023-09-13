# Changelog

<a name="unreleased"></a>
## Unreleased

### 🐛 Bug Fixes
- [`f6bc406`](https://github.com/maicol07/mithril-utilities/commit/f6bc4060c55895d7b6b585c7ccb48efe94e80e5a) oninput event not caught on some elements

    The oninput function in Form.tsx was updated to utilize 'getAttribute' for element name retrieval instead of 'name'. This enhances compatibility for HTML elements with no 'name' attribute but an input id.

### 👷 CI changes
- [`75df335`](https://github.com/maicol07/mithril-utilities/commit/75df33547d6dfeb16384c1efc698a48e21cd4e46) version bump to 1.2.7
- [`f0986b8`](https://github.com/maicol07/mithril-utilities/commit/f0986b82c43f7798549292ecb5d0394ef4bc2ee5) version bump to 1.2.6


<a name="1.2.6"></a>
## [1.4.0](https://github.com/maicol07/mithril-utilities/compare/v1.3.0...v1.4.0) (2023-09-13)


### Features

* Listen onchange event by default ([ebe438d](https://github.com/maicol07/mithril-utilities/commit/ebe438db9bcd40052d941a4532dabd560da4511b))

## [1.3.0](https://github.com/maicol07/mithril-utilities/compare/1.2.7...v1.3.0) (2023-09-13)


### Features

* Re-add support for custom value properties in Form inputs ([c3460e7](https://github.com/maicol07/mithril-utilities/commit/c3460e7ca68be3560d71f043862404f21d88e6ac))
* Reintroduced additional events handling ([f16db76](https://github.com/maicol07/mithril-utilities/commit/f16db7643b02509120866bd979f4e7d2054c5c85))

## [1.2.6](https://github.com/maicol07/mithril-utilities/compare/1.2.5...1.2.6)

> Released on August 17, 2023

### ✨ Features
- [`97bd49e`](https://github.com/maicol07/mithril-utilities/commit/97bd49ed31498bde74c7acb655bdf87f12c081d5) ✨ Add support for additional form elements

    This commit adds the ability to include additional form elements using a selector. The 'additionalElementsSelector' property was added to the FormAttributes interface and used in 'oncreate'. Form elements not directly attached to the form but that match the selector are now included in 'formElements'. This was necessary to support forms that have input elements which are not direct children of the form.

### 👷 CI changes
- [`2c4dc85`](https://github.com/maicol07/mithril-utilities/commit/2c4dc858975d3de7ebf663dffe35ed9fffb96203) version bump to 1.2.5

### Other changes
- [`5d53619`](https://github.com/maicol07/mithril-utilities/commit/5d5361983774f35d8d83305ea8ba9ec9dea75798) **deps:** ⬆️ Update [@types](:/types)/mithril to version 2.0.13

    Updated the devDependency [@types](:/types)/mithril to version 2.0.13 in package.json and pnpm-lock.yaml. This was necessitated by the need to keep up with the latest changes and improvements in the Mithril type definitions. Ensuring the type definitions used in the project align with the current state of Mithril enhances type safety and improves developer experience.


<a name="1.2.5"></a>
## [1.2.5](https://github.com/maicol07/mithril-utilities/compare/1.2.4...1.2.5)

> Released on August 04, 2023

### 🐛 Bug Fixes
- [`6aa9a24`](https://github.com/maicol07/mithril-utilities/commit/6aa9a246093f5ba0fe7de8a58e81b79afdea258d) Default to empty string when there isn't a value

### 👷 CI changes
- [`bbc07e1`](https://github.com/maicol07/mithril-utilities/commit/bbc07e17220268e7a9aea7c46723f9517996b6dd) version bump to 1.2.4


<a name="1.2.4"></a>
## [1.2.4](https://github.com/maicol07/mithril-utilities/compare/1.2.3...1.2.4)

> Released on July 19, 2023

### 🐛 Bug Fixes
- [`149cfa8`](https://github.com/maicol07/mithril-utilities/commit/149cfa810b5d73184b43d0de1902fb923cc4843e) **form:** Fix streams not working

### 👷 CI changes
- [`43998d2`](https://github.com/maicol07/mithril-utilities/commit/43998d2a4066784ad8fecd5faa0d9f34575fc267) version bump to 1.2.3

### Other changes
- [`5f95620`](https://github.com/maicol07/mithril-utilities/commit/5f956201af51fcd9fdf7bcca76496acaf43cd9a2) Added dev command


<a name="1.2.3"></a>
## [1.2.3](https://github.com/maicol07/mithril-utilities/compare/1.2.1...1.2.3)

> Released on July 18, 2023

### 🐛 Bug Fixes
- [`5559a0a`](https://github.com/maicol07/mithril-utilities/commit/5559a0aa61cdc5bcc3cab6fb761e46ea5dde0329) Fix latest form changes

### 👷 CI changes
- [`7597608`](https://github.com/maicol07/mithril-utilities/commit/7597608e843de1fbe73cad29ad027b8e1a687f68) version bump to 1.2.2
- [`db34016`](https://github.com/maicol07/mithril-utilities/commit/db34016bea05a3e5c3055bc37d51576354b4bad3) version bump to 1.2.1


<a name="1.2.1"></a>
## [1.2.1](https://github.com/maicol07/mithril-utilities/compare/1.2.0...1.2.1)

> Released on July 18, 2023

### 🐛 Bug Fixes
- [`b2f6d0d`](https://github.com/maicol07/mithril-utilities/commit/b2f6d0d4c33c39ebe84e39cd5039d92c53b6b490) **request:** Send `X-Requested-With` header

### 👷 CI changes
- [`8ea3b42`](https://github.com/maicol07/mithril-utilities/commit/8ea3b42ccaa7e038cf6aeab2a6106db940e42856) version bump to 1.2.0

### Other changes
- [`60446e9`](https://github.com/maicol07/mithril-utilities/commit/60446e9e0777fbe7997a76b9aaeffb079a8409f9) **component:** Remove private from _attrs
- [`8b80549`](https://github.com/maicol07/mithril-utilities/commit/8b8054939422d0f65b814ca82309ab8f4f494ad2) **deps:** ⬆️ Upgraded dependencies
- [`a7cd65c`](https://github.com/maicol07/mithril-utilities/commit/a7cd65c1983058516c6ac6d00dd60ed9c159655a) **form:** Take advantage of event bubbling


<a name="1.2.0"></a>
## [1.2.0](https://github.com/maicol07/mithril-utilities/compare/1.1.3...1.2.0)

> Released on May 15, 2023

### ✨ Features
- [`77d87b2`](https://github.com/maicol07/mithril-utilities/commit/77d87b28e9411390c4e3d783043f02808d9065eb) ✨ Added preferred event and value prop

### 🐛 Bug Fixes
- [`9adb6b9`](https://github.com/maicol07/mithril-utilities/commit/9adb6b9dfc88d41fcfecfb42aaee38f6a849a57b) **form:** Don't submit the form if there is already a submit button registered in the form

### 👷 CI changes
- [`79c0c75`](https://github.com/maicol07/mithril-utilities/commit/79c0c7549c9711e793aaa8586df991c673fd8c0c) version bump to 1.1.3

### Other changes
- [`bf4f3fc`](https://github.com/maicol07/mithril-utilities/commit/bf4f3fcd68fa448796b26121ccfd6ef19c519d91) Added example
- [`e6d237e`](https://github.com/maicol07/mithril-utilities/commit/e6d237eb51bf763d1c0d34af211bb14a782cac04) ✏️ Improved typings
- [`4783f9b`](https://github.com/maicol07/mithril-utilities/commit/4783f9b65e897b020e4300495ea31243cb1e670d) **deps:** ⬆️ Upgraded dependencies
- [`95d31b8`](https://github.com/maicol07/mithril-utilities/commit/95d31b86b19415196324b42160abdc8c491c584e) **deps:** Added `http-server` for running the example


<a name="1.1.3"></a>
## [1.1.3](https://github.com/maicol07/mithril-utilities/compare/1.1.2...1.1.3)

> Released on May 08, 2023

### ✨ Features
- [`0bdc76b`](https://github.com/maicol07/mithril-utilities/commit/0bdc76bdd3e0ed22ec80da87cd648ccd0f2ef811) **form:** Don't submit the form if there is already a submit button registered in the form

### 🐛 Bug Fixes
- [`1cc0047`](https://github.com/maicol07/mithril-utilities/commit/1cc0047b0e7ee467bce3c8d30252540320a20ddb) **form:** Check if value is equal to current one

### 👷 CI changes
- [`ce7aa5f`](https://github.com/maicol07/mithril-utilities/commit/ce7aa5fb48c3600d17dd3888eb8229129660d829) version bump to 1.1.2


<a name="1.1.2"></a>
## [1.1.2](https://github.com/maicol07/mithril-utilities/compare/1.1.1...1.1.2)

> Released on May 04, 2023

### 🐛 Bug Fixes
- [`5403764`](https://github.com/maicol07/mithril-utilities/commit/5403764ea349c65a58207aac61587ba0a9b4fc0e) Exports not working correctly
- [`b6e85c2`](https://github.com/maicol07/mithril-utilities/commit/b6e85c262c9b0945527dff44a40b90f2ad7d88b7) **request:** 🏷️ Added generic defaults

### 👷 CI changes
- [`6abbcba`](https://github.com/maicol07/mithril-utilities/commit/6abbcbad4d4eca9048d3f79ed610c3a87bff5716) version bump to 1.1.1


<a name="1.1.1"></a>
## [1.1.1](https://github.com/maicol07/mithril-utilities/compare/1.1.0...1.1.1)

> Released on April 25, 2023

### 🐛 Bug Fixes
- [`69e4fd1`](https://github.com/maicol07/mithril-utilities/commit/69e4fd1bc3d01e144860b6a6e56981df18e46bde) 🏷️ Removed types from package.json

    Typings weren't show correctly

### 👷 CI changes
- [`2c53db8`](https://github.com/maicol07/mithril-utilities/commit/2c53db8c9d557562bb485c04b044187e630d2a3a) 📝 Updated release workflow
- [`3d3ac23`](https://github.com/maicol07/mithril-utilities/commit/3d3ac23884db056dd9b419669cc609dec5c4337a) 👷 Added changelog generation workflow


<a name="1.1.0"></a>
## 1.1.0

> Released on April 17, 2023

### ✨ Features
- [`cf7fa74`](https://github.com/maicol07/mithril-utilities/commit/cf7fa745f6fbed487c310b33350edaae83ffcef3) ✨ Added Request class
- [`393ad67`](https://github.com/maicol07/mithril-utilities/commit/393ad671b7d40a06b3ecd53c76db8525c6afe360) ✨ Improved typings and JSX
- [`d9b11ee`](https://github.com/maicol07/mithril-utilities/commit/d9b11ee227d460f98014a39d44b2bf472ea10130) Initial commit

### 🐛 Bug Fixes
- [`27e138e`](https://github.com/maicol07/mithril-utilities/commit/27e138ef6507fbb279cc0eae2f7c09cc69d51ac1) Added missing export for Request

### 📝 Docs changes
- [`be252a6`](https://github.com/maicol07/mithril-utilities/commit/be252a613f835212d86ffcb3bbe4ba8063a7ef5f) 📝 Updated docs
- [`3268167`](https://github.com/maicol07/mithril-utilities/commit/32681671342595aea1db79d0dc9380dcc568a06a) 📝 Updated docs

### 👷 CI changes
- [`2a995ae`](https://github.com/maicol07/mithril-utilities/commit/2a995ae390257ce283089bfffe875f19213c7857) version bump to 1.1.0
- [`4c528d3`](https://github.com/maicol07/mithril-utilities/commit/4c528d3ef48e56c489d7b5492f1ca54a81326e7d) 💚 Fixed permissions
- [`cdcecb1`](https://github.com/maicol07/mithril-utilities/commit/cdcecb1ac19d7da9573f10f22a700ef893ae74c3) 💚 Fixed missing workflows version
- [`0ca29f8`](https://github.com/maicol07/mithril-utilities/commit/0ca29f8b09777e6b91bbb1218a38faf13511bb52) 💚 Fixed workflows path
- [`80fc2c9`](https://github.com/maicol07/mithril-utilities/commit/80fc2c9d9143fd981add23e35739bbf43c464569) 💚 Added missing secrets
- [`4eee58c`](https://github.com/maicol07/mithril-utilities/commit/4eee58c658042cefcc36c78e929dba36e3b6de95) 👷 Added format for changelog generation
- [`3c5fbcf`](https://github.com/maicol07/mithril-utilities/commit/3c5fbcfdeb52b86428556558053057fc767ccb9c) 👷 Added workflow for changelog, release and publish

### Other changes
- [`b9ee95b`](https://github.com/maicol07/mithril-utilities/commit/b9ee95b9f4f936a1bb27c6afe25d99a6c2218a67) 🚚 Moved advanced JSX types to root
- [`fb2b4f8`](https://github.com/maicol07/mithril-utilities/commit/fb2b4f8f474b8b39920f6d863fce2b45e3a6e6f5) **deps:** ⬆️ Upgraded dependencies
