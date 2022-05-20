/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        Code bock copy rendering plugin
 * CVM-Role:        CodeMirror Plugin
 * Maintainer:      Edgar Tang
 * License:         GNU GPL v3
 *
 * Description:     This plugin renders code block copy button display
 *
 * END HEADER
 */
import CodeMirror, { commands } from 'codemirror'
const codeBlockCopyButtonClass = 'code-block-copy-button'

/**
 * Declare the destoryCodeBlockCopy function
 *
 * @param   {CodeMirror.Editor}  cm  The CodeMirror instance
 */
function removeCodeBlockCopyButtons (cm: CodeMirror.Editor): void {
  document.querySelectorAll('.' + codeBlockCopyButtonClass).forEach(e => e.remove())
}

/**
 * Declare the markdownDestoryCodeBlockCopy command
 *
 * @param   {CodeMirror.Editor}  cm  The CodeMirror instance
 */
;(commands as any).markdownDestoryCodeBlockCopy = function (cm: CodeMirror.Editor) {
  removeCodeBlockCopyButtons(cm)
}

/**
 * Declare the markdownRenderCodeBlockCopy command
 *
 * @param   {CodeMirror.Editor}  cm  The CodeMirror instance
 */
;(commands as any).markdownRenderCodeBlockCopy = function (cm: CodeMirror.Editor) {
  const lineCount = cm.lineCount()
  const codeBlockRE = /^(?:\s{0,3}`{3}|~{3}).*/
  const clipboard = window.clipboard

  let inCodeBlock = false
  let codeText = ''
  let codeBlockStartLine = 0

  // Remove exists buttons
  removeCodeBlockCopyButtons(cm)

  cm.startOperation()

  // Check lines for code blocks
  for (let i = 0; i < lineCount; i++) {
    const line = cm.getLine(i)
    if (!inCodeBlock) {
      // Code block first line
      if (codeBlockRE.test(line)) {
        // Begin a codeblock
        codeBlockStartLine = i
        inCodeBlock = true
        codeText = ''
      }
    } else if (codeBlockRE.test(line) && inCodeBlock) {
      // Code block last line
      inCodeBlock = false
      let icon = document.createElement('clr-icon')
      icon.title = 'Copy code block'
      icon.classList.add(codeBlockCopyButtonClass)
      icon.style.float = 'right'
      icon.style.position = 'absolute'
      icon.style.zIndex = '9'
      icon.style.marginTop = '5px'
      icon.setAttribute('shape', 'copy')

      // For async methods, use const to declare the variable to avoid changing the value
      const copyCodeText = codeText
      icon.addEventListener('click', function (e) {
        clipboard.writeText(copyCodeText)
      })

      cm.addWidget({ line: codeBlockStartLine, ch: 0 }, icon, true)
    } else if (inCodeBlock) {
      // Within a codeblock
      codeText += line + '\n'
    }
  }

  cm.endOperation()
}
