import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Attributes from './attributes';
import {
  CdataElement,
  CommentElement,
  InstructionElement,
  TextElement,
} from './parts';

function getIndentationString(size) {
  return new Array(size + 1).join(' ');
}

function isTextElement(elements) {
  return elements.length === 1 && elements[0].type === 'text';
}

function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
  return '';
}

function onSelectText(e) {
  e.stopPropagation();
}

const Element = memo(
  ({
    name,
    elements,
    attributes,
    theme,
    indentation,
    indentSize,
    isCollapsible,
  }) => {
    const [collapsed, toggleCollapse] = useState(false);

    const cursor = isCollapsible && elements ? 'pointer' : 'text';

    return (
      <div
        style={{ whiteSpace: 'pre', cursor }}
        onClick={(event) => {
          if (!isCollapsible || !elements) {
            return;
          }
          event.stopPropagation();
          event.preventDefault();

          if (getSelectedText() === '') {
            toggleCollapse(!collapsed);
          }
        }}
      >
        <span style={{ color: theme.separatorColor }}>{`${indentation}<`}</span>
        <span style={{ color: theme.tagColor }}>{name}</span>
        {!collapsed && <Attributes attributes={attributes} theme={theme} />}
        <span style={{ color: theme.separatorColor }}>
          {elements ? '>' : '/>'}
        </span>
        {elements && !collapsed && (
          <span onClick={onSelectText}>
            <Elements
              elements={elements}
              theme={theme}
              indentation={indentation + getIndentationString(indentSize)}
              indentSize={indentSize}
              isCollapsible={isCollapsible}
            />
          </span>
        )}
        {elements && (
          <span style={{ color: theme.separatorColor }}>{`${
            isTextElement(elements) || collapsed ? '' : indentation
          }</`}</span>
        )}
        {elements && <span style={{ color: theme.tagColor }}>{name}</span>}
        {elements && <span style={{ color: theme.separatorColor }}>{'>'}</span>}
      </div>
    );
  }
);

Element.propTypes = {
  name: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(PropTypes.object),
  attributes: PropTypes.object,
  theme: PropTypes.object.isRequired,
  indentation: PropTypes.string.isRequired,
  indentSize: PropTypes.number.isRequired,
  isCollapsible: PropTypes.bool.isRequired,
};

const getElement = (theme, indentation, indentSize, isCollapsible) => (
  element,
  index
) => {
  switch (element.type) {
    case 'text':
      return (
        <TextElement key={`el-${index}`} text={element.text} theme={theme} />
      );
    case 'element':
      return (
        <Element
          key={`el-${index}`}
          name={element.name}
          elements={element.elements}
          attributes={element.attributes}
          theme={theme}
          indentation={indentation}
          indentSize={indentSize}
          isCollapsible={isCollapsible}
        />
      );
    case 'comment':
      return (
        <CommentElement
          key={`el-${index}`}
          comment={element.comment}
          theme={theme}
          indentation={indentation}
        />
      );
    case 'cdata':
      return (
        <CdataElement
          key={`el-${index}`}
          cdata={element.cdata}
          theme={theme}
          indentation={indentation}
        />
      );
    case 'instruction':
      return (
        <InstructionElement
          key={`el-${index}`}
          instruction={element.instruction}
          name={element.name}
          theme={theme}
          indentation={indentation}
        />
      );
    default:
      return null;
  }
};

const Elements = memo(
  ({ elements, theme, indentation, indentSize, isCollapsible }) => {
    return elements.map(
      getElement(theme, indentation, indentSize, isCollapsible)
    );
  }
);

Elements.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.object.isRequired,
  indentation: PropTypes.string.isRequired,
  indentSize: PropTypes.number.isRequired,
  isCollapsible: PropTypes.bool.isRequired,
};

export default Elements;
