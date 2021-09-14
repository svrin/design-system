export const Keys = {
  Backspace: 'Backspace',
  Clear: 'Clear',
  Down: 'ArrowDown',
  End: 'End',
  Enter: 'Enter',
  Escape: 'Escape',
  Home: 'Home',
  Left: 'ArrowLeft',
  PageDown: 'PageDown',
  PageUp: 'PageUp',
  Right: 'ArrowRight',
  Space: ' ',
  Tab: 'Tab',
  Up: 'ArrowUp',
};

export const MenuActions = {
  Close: 'Close',
  CloseSelect: 'CloseSelect',
  First: 'First',
  Last: 'Last',
  Next: 'Next',
  Open: 'Open',
  PageDown: 'PageDown',
  PageUp: 'PageUp',
  Previous: 'Previous',
  Select: 'Select',
  Space: 'Space',
  Type: 'Type',
};

export const TreeActions = {
  Close: 'Close',
  First: 'First',
  Last: 'Last',
  Next: 'Next',
  Open: 'Open',
  Previous: 'Previous',
  Select: 'Select',
  UpLevel: 'UpLevel',
};

// filter an array of options against an input string
// returns an array of options that begin with the filter string, case-independent
export function filterOptions(options = [], filter, exclude = []) {
  return options.filter((option) => {
    const matches = option.name.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

// return an array of exact option name matches from a comma-separated string
export function findMatches(options, search) {
  const names = search.split(',');
  return names
    .map((name) => {
      const match = options.filter((option) => name.trim().toLowerCase() === option.name.toLowerCase());
      return match.length > 0 ? match[0] : null;
    })
    .filter((option) => option !== null);
}

// return combobox action from key press
export function getActionFromKey(key, menuOpen) {
  // handle opening when closed
  if (!menuOpen && key === Keys.Down) {
    return MenuActions.Open;
  }
  // handle keys when open
  if (key === Keys.Down || key === Keys.Right) {
    return MenuActions.Next;
  } else if (key === Keys.Up || key === Keys.Left) {
    return MenuActions.Previous;
  } else if (key === Keys.Home) {
    return MenuActions.First;
  } else if (key === Keys.End) {
    return MenuActions.Last;
  } else if (key === Keys.Escape) {
    return MenuActions.Close;
  } else if (key === Keys.Enter) {
    return MenuActions.CloseSelect;
  } else if (key === Keys.Backspace || key === Keys.Clear || key.length === 1) {
    return MenuActions.Type;
  }
}

// get index of option that matches a string
export function getIndexByLetter(options, filter) {
  const firstMatch = filterOptions(options, filter)[0];
  return firstMatch ? options.indexOf(firstMatch) : -1;
}

// get updated option index
export function getUpdatedIndex(current, max, action) {
  switch (action) {
    case MenuActions.First:
      return 0;
    case MenuActions.Last:
      return max;
    case MenuActions.Previous:
      return Math.max(0, current - 1);
    case MenuActions.Next:
      return Math.min(max, current + 1);
    default:
      return current;
  }
}

// check if an element is currently scrollable
export function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

// ensure given child element is within the parent's visible scroll area
export function maintainScrollVisibility(activeElement, scrollParent) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;
  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;
  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}
