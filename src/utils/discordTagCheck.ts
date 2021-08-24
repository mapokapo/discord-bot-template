const checkUserTag = (text: string): boolean => {
  return /^<@!?(\d+)>$/.test(text);
};

const checkRoleTag = (text: string): boolean => {
  return /^<@&(\d+)>$/.test(text);
};

const checkChannelTag = (text: string): boolean => {
  return /^<#(\d+)>$/.test(text);
};

export default {
  checkUserTag,
  checkRoleTag,
  checkChannelTag,
};
