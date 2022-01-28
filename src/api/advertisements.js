import axios from "axios";

const FetchWeeeklyAdvertisements = () => {
  try {
    return [
      {
        payload: [
          {
            week_id: 1,
            slot_home_page: 10,
            slot_vote_page: 8,
            created_at: new Date(),
          },
        ],
      },
      null,
    ];
  } catch (e) {
    return [null, e];
  }
};

export { FetchWeeeklyAdvertisements };
