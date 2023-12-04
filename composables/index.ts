export const useSuccessAlertMessageStore = () => {
  return useState<{ message: string; show: boolean }>("success-alert", () => {
    return {
      message: "",
      show: false,
    };
  });
};

export const useFailedAlertMessageStore = () => {
  return useState<{ message: string; show: boolean }>("failed-alert", () => {
    return {
      message: "",
      show: false,
    };
  });
};

export const useTitleStore = () => {
  return useState<{ title: string }>("title", () => {
    return {
        title: "",
    };
  });
};