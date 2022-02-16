function verifyStars(checkboxId) {
  if (checkboxId === 'one') {
    return {
      checkedOne: true,
      checkedTwo: false,
      checkedThee: false,
      checkedFour: false,
      checkedFive: false,
      itemReviewStar: 1,
    };
  } if (checkboxId === 'two') {
    return {
      checkedOne: true,
      checkedTwo: true,
      checkedThee: false,
      checkedFour: false,
      checkedFive: false,
      itemReviewStar: 2,
    };
  } if (checkboxId === 'thee') {
    return {
      checkedOne: true,
      checkedTwo: true,
      checkedThee: true,
      checkedFour: false,
      checkedFive: false,
      itemReviewStar: 3,
    };
  } if (checkboxId === 'four') {
    return {
      checkedOne: true,
      checkedTwo: true,
      checkedThee: true,
      checkedFour: true,
      checkedFive: false,
      itemReviewStar: 4,
    };
  }
  return {
    checkedOne: true,
    checkedTwo: true,
    checkedThee: true,
    checkedFour: true,
    checkedFive: true,
    itemReviewStar: 5,
  };
}

export default verifyStars;
