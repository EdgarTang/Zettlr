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

/**
* Declare the markdownRenderCodeBlockCopy command
*
* @param   {CodeMirror.Editor}  cm  The CodeMirror instance
*/
(commands as any).markdownRenderCodeBlockCopy = function (cm: CodeMirror.Editor) {
}
