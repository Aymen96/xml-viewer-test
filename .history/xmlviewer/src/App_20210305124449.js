import './App.css';
import XMLViewer from './xmlviewer/XMLViewer';

const xml =
  '<?xml version="1.0"?><example description="XML Example"><hello>World</hello><!-- <comment>example</comment> --><cdata><![CDATA[<foo></bar>]]></cdata><?go example?></example>';

function App() {
  return (
    <div className="App" style={{text-align:left}}>
      <XMLViewer
        collapsible={true}
        xml={xml}
        theme={{ elementPadding: '100px' }}
      />
    </div>
  );
}

export default App;
