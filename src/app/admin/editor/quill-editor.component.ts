import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
  ViewChild
  
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator
} from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Http, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'




import * as Quill from 'quill';

@Component({
  selector: 'quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],  
  // <button (click)="show()"> Show </button>
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuillEditorComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => QuillEditorComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class QuillEditorComponent implements AfterViewInit, ControlValueAccessor, OnChanges, Validator {
    foods = [
    {value: 'steak', viewValue: 'Steak'},
    {value: 'pizza', viewValue: 'Pizza'},
    {value: 'tacos', viewValue: 'Tacos'}
  ];



  
  private id;
  quillEditor: any;
  editorElem: HTMLElement;
  emptyArray: any[] = [];
  content: any;
  defaultModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': this.emptyArray.slice() }, { 'background': this.emptyArray.slice() }],          // dropdown with defaults from theme
      [{ 'font': this.emptyArray.slice() }],
      [{ 'align': this.emptyArray.slice() }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  //title
  public title:string;
  public category:string;
  public blogs;
  public img;

  @Input() theme: string;
  @Input() modules: { [index: string]: Object };
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() required: boolean;
  @Input() formats: string[];
  @Input() style: any = {};
  @Input() bounds: HTMLElement | string;

  @Output() onEditorCreated: EventEmitter<any> = new EventEmitter();
  @Output() onContentChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileInput') fileInput;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(private http: Http,private elementRef: ElementRef, @Inject(DOCUMENT) private doc: any, private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router
) {
  this.blogs=[{img:"", title:""}]
 }
  ngOnInit() {
    // this.hero$ = this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.service.getHero(params.get('id')));
    this.route.params.subscribe(params=>{
      console.log(params.id);
      this.http.get("/api/blog/"+params.id).subscribe((data)=>{
        console.log(data.text());
       
        this.blogs =  JSON.parse(data.text());
       
        console.log("blogs is");
        this.title = this.blogs[0].title;
        this.quillEditor.root.innerHTML = this.blogs[0].content;
        this.img = this.blogs[0].img;
        // return true;
      }, (error)=>{
        // return false;
        console.log("error cnm");
      });

    })
  }

  


  ngAfterViewInit() {
    const toolbarElem = this.elementRef.nativeElement.querySelector('[quill-editor-toolbar]');
    let modules: any = this.modules || this.defaultModules;
    let placeholder = '';
  

    if (this.placeholder !== null && this.placeholder !== undefined) {
      placeholder = this.placeholder.trim();
    }

    if (toolbarElem) {
      modules['toolbar'] = toolbarElem;
    }
    this.elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div quill-editor-element></div>');
    this.editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-element]');

    if (this.style) {
      Object.keys(this.style).forEach((key: string) => {
        this.renderer.setStyle(this.editorElem, key, this.style[key]);
      });
    }

    this.quillEditor = new Quill(this.editorElem, {
      modules: modules,
      placeholder: placeholder,
      readOnly: this.readOnly || false,
      theme: this.theme || 'snow',
      formats: this.formats,
      bounds: this.bounds || this.doc.body
    });


    if (this.content) {
      const contents = this.quillEditor.clipboard.convert(this.content);
      this.quillEditor.setContents(contents);
      this.quillEditor.history.clear();
    }

    this.onEditorCreated.emit(this.quillEditor);

    // mark model as touched if editor lost focus
    this.quillEditor.on('selection-change', (range: any, oldRange: any, source: string) => {
      this.onSelectionChanged.emit({
        editor: this.quillEditor,
        range: range,
        oldRange: oldRange,
        source: source
      });

      if (!range) {
        this.onModelTouched();
      }
    });


    // update model if text changes
    this.quillEditor.on('text-change', (delta: any, oldDelta: any, source: string) => {
      let html: (string | null) = this.editorElem.children[0].innerHTML;
      const text = this.quillEditor.getText();

      if (html === '<p><br></p>') {
          html = null;
      }

      this.onModelChange(html);

      this.onContentChanged.emit({
        editor: this.quillEditor,
        html: html,
        text: text,
        delta: delta,
        oldDelta: oldDelta,
        source: source
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['readOnly'] && this.quillEditor) {
      this.quillEditor.enable(!changes['readOnly'].currentValue);
    }
  }

  writeValue(currentValue: any) {
    this.content = currentValue;

    if (this.quillEditor) {
      if (currentValue) {
        this.quillEditor.setContents(this.quillEditor.clipboard.convert(this.content));
        return;
      }
      this.quillEditor.setText('');
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }


  validate() {
    if (!this.quillEditor) {
      return null;
    }
  

    let err: {
      minLengthError?: {given: number, minLength: number};
      maxLengthError?: {given: number, maxLength: number};
      requiredError?: {empty: boolean}
    } = {},
    valid = true;

    const textLength = this.quillEditor.getText().trim().length;

    if (this.minLength && textLength && textLength < this.minLength) {
      err.minLengthError = {
        given: textLength,
        minLength: this.minLength
      };

      valid = false;
    }

    if (this.maxLength && textLength > this.maxLength) {
      err.maxLengthError = {
        given: textLength,
        maxLength: this.maxLength
      };

      valid = false;
    }

    if (this.required && !textLength) {
      err.requiredError = {
        empty: true
      };

      valid = false;
    }

    return valid ? null : err;
  }

  submit() {
      if(this.id == null) {
        console.log('null');
        let blog = {title: this.title,
        content: this.quillEditor.root.innerHTML, category: this.category, quill: this.quillEditor.getContents()}
        let fileBrowser = this.fileInput.nativeElement;
        const formData = new FormData();  
        formData.append("image", fileBrowser.files[0]);
        formData.append("blog", JSON.stringify(blog))
        let arg:RequestOptionsArgs = {
          headers: new Headers({'Authorization': localStorage.getItem('user')})
        }
        let options = new RequestOptions(arg);  
        this.http.post('/api/blog', formData, options).subscribe();
        this.router.navigateByUrl('/admin/blog');
      } else {
        console.log('not null');
        let blog = {title: this.title,
        content: this.quillEditor.root.innerHTML, category: this.category, quill: this.quillEditor.getContents()}
        let fileBrowser = this.fileInput.nativeElement;
        const formData = new FormData();  
        formData.append("image", fileBrowser.files[0]);
        formData.append("blog", JSON.stringify(blog));
        formData.append("id", this.id);
        let arg:RequestOptionsArgs = {
          headers: new Headers({'Authorization': localStorage.getItem('user')})
        }
        let options = new RequestOptions(arg);  
        this.http.put('/api/blog/'+this.id, formData, options).subscribe();
        this.router.navigateByUrl('/admin/blog')
      }
  }
}

