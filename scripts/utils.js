const getScrollBarWidth = () => {
  const div = document.createElement('div');
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.append(div);
  const scrollBarWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollBarWidth;
};

export { getScrollBarWidth };
