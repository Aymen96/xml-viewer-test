import './App.css';
import XMLViewer from './xmlviewer/XMLViewer';

const xml =
  '<?xml version="1.0"?><example description="XML Example"><hello>World</hello><!-- <comment>example</comment> --><cdata><![CDATA[<foo></bar>]]></cdata><?go example?></example>';

function App() {
  return (
    <div className="App">
      <XMLViewer xml={xml} />
    </div>
  );
}

export default App;
