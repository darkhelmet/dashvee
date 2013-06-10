/*

StackBlur - a fast almost Gaussian Blur For Canvas

Version: 	0.5
Author:		Mario Klingemann
Contact: 	mario@quasimondo.com
Website:	http://www.quasimondo.com/StackBlurForCanvas
Twitter:	@quasimondo

In case you find this class useful - especially in commercial projects -
I am not totally unhappy for a small donation to my PayPal account
mario@quasimondo.de

Or support me on flattr:
https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

Copyright (c) 2010 Mario Klingemann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
function stackBlurImage(e,t,n,r){var i=document.getElementById(e),s=i.naturalWidth,o=i.naturalHeight,u=document.getElementById(t);u.style.width=s+"px",u.style.height=o+"px",u.width=s,u.height=o;var a=u.getContext("2d");a.clearRect(0,0,s,o),a.drawImage(i,0,0);if(isNaN(n)||n<1)return;r?stackBlurCanvasRGBA(t,0,0,s,o,n):stackBlurCanvasRGB(t,0,0,s,o,n)}function stackBlurCanvasRGBA(e,t,n,r,i,s){if(isNaN(s)||s<1)return;s|=0;var o=document.getElementById(e),u=o.getContext("2d"),a;try{try{a=u.getImageData(t,n,r,i)}catch(f){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),a=u.getImageData(t,n,r,i)}catch(f){throw new Error("unable to access local image data: "+f)}}}catch(f){throw new Error("unable to access image data: "+f)}var l=a.data,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H=s+s+1,B=r<<2,j=r-1,F=i-1,I=s+1,q=I*(I+1)/2,R=new BlurStack,U=R;for(p=1;p<H;p++){U=U.next=new BlurStack;if(p==I)var z=U}U.next=R;var W=null,X=null;g=m=0;var V=mul_table[s],$=shg_table[s];for(h=0;h<i;h++){C=k=L=A=y=b=w=E=0,S=I*(O=l[m]),x=I*(M=l[m+1]),T=I*(_=l[m+2]),N=I*(D=l[m+3]),y+=q*O,b+=q*M,w+=q*_,E+=q*D,U=R;for(p=0;p<I;p++)U.r=O,U.g=M,U.b=_,U.a=D,U=U.next;for(p=1;p<I;p++)d=m+((j<p?j:p)<<2),y+=(U.r=O=l[d])*(P=I-p),b+=(U.g=M=l[d+1])*P,w+=(U.b=_=l[d+2])*P,E+=(U.a=D=l[d+3])*P,C+=O,k+=M,L+=_,A+=D,U=U.next;W=R,X=z;for(c=0;c<r;c++)l[m+3]=D=E*V>>$,D!=0?(D=255/D,l[m]=(y*V>>$)*D,l[m+1]=(b*V>>$)*D,l[m+2]=(w*V>>$)*D):l[m]=l[m+1]=l[m+2]=0,y-=S,b-=x,w-=T,E-=N,S-=W.r,x-=W.g,T-=W.b,N-=W.a,d=g+((d=c+s+1)<j?d:j)<<2,C+=W.r=l[d],k+=W.g=l[d+1],L+=W.b=l[d+2],A+=W.a=l[d+3],y+=C,b+=k,w+=L,E+=A,W=W.next,S+=O=X.r,x+=M=X.g,T+=_=X.b,N+=D=X.a,C-=O,k-=M,L-=_,A-=D,X=X.next,m+=4;g+=r}for(c=0;c<r;c++){k=L=A=C=b=w=E=y=0,m=c<<2,S=I*(O=l[m]),x=I*(M=l[m+1]),T=I*(_=l[m+2]),N=I*(D=l[m+3]),y+=q*O,b+=q*M,w+=q*_,E+=q*D,U=R;for(p=0;p<I;p++)U.r=O,U.g=M,U.b=_,U.a=D,U=U.next;v=r;for(p=1;p<=s;p++)m=v+c<<2,y+=(U.r=O=l[m])*(P=I-p),b+=(U.g=M=l[m+1])*P,w+=(U.b=_=l[m+2])*P,E+=(U.a=D=l[m+3])*P,C+=O,k+=M,L+=_,A+=D,U=U.next,p<F&&(v+=r);m=c,W=R,X=z;for(h=0;h<i;h++)d=m<<2,l[d+3]=D=E*V>>$,D>0?(D=255/D,l[d]=(y*V>>$)*D,l[d+1]=(b*V>>$)*D,l[d+2]=(w*V>>$)*D):l[d]=l[d+1]=l[d+2]=0,y-=S,b-=x,w-=T,E-=N,S-=W.r,x-=W.g,T-=W.b,N-=W.a,d=c+((d=h+I)<F?d:F)*r<<2,y+=C+=W.r=l[d],b+=k+=W.g=l[d+1],w+=L+=W.b=l[d+2],E+=A+=W.a=l[d+3],W=W.next,S+=O=X.r,x+=M=X.g,T+=_=X.b,N+=D=X.a,C-=O,k-=M,L-=_,A-=D,X=X.next,m+=r}u.putImageData(a,t,n)}function stackBlurCanvasRGB(e,t,n,r,i,s){if(isNaN(s)||s<1)return;s|=0;var o=document.getElementById(e),u=o.getContext("2d"),a;try{try{a=u.getImageData(t,n,r,i)}catch(f){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),a=u.getImageData(t,n,r,i)}catch(f){throw new Error("unable to access local image data: "+f)}}}catch(f){throw new Error("unable to access image data: "+f)}var l=a.data,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M=s+s+1,_=r<<2,D=r-1,P=i-1,H=s+1,B=H*(H+1)/2,j=new BlurStack,F=j;for(p=1;p<M;p++){F=F.next=new BlurStack;if(p==H)var I=F}F.next=j;var q=null,R=null;g=m=0;var U=mul_table[s],z=shg_table[s];for(h=0;h<i;h++){T=N=C=y=b=w=0,E=H*(k=l[m]),S=H*(L=l[m+1]),x=H*(A=l[m+2]),y+=B*k,b+=B*L,w+=B*A,F=j;for(p=0;p<H;p++)F.r=k,F.g=L,F.b=A,F=F.next;for(p=1;p<H;p++)d=m+((D<p?D:p)<<2),y+=(F.r=k=l[d])*(O=H-p),b+=(F.g=L=l[d+1])*O,w+=(F.b=A=l[d+2])*O,T+=k,N+=L,C+=A,F=F.next;q=j,R=I;for(c=0;c<r;c++)l[m]=y*U>>z,l[m+1]=b*U>>z,l[m+2]=w*U>>z,y-=E,b-=S,w-=x,E-=q.r,S-=q.g,x-=q.b,d=g+((d=c+s+1)<D?d:D)<<2,T+=q.r=l[d],N+=q.g=l[d+1],C+=q.b=l[d+2],y+=T,b+=N,w+=C,q=q.next,E+=k=R.r,S+=L=R.g,x+=A=R.b,T-=k,N-=L,C-=A,R=R.next,m+=4;g+=r}for(c=0;c<r;c++){N=C=T=b=w=y=0,m=c<<2,E=H*(k=l[m]),S=H*(L=l[m+1]),x=H*(A=l[m+2]),y+=B*k,b+=B*L,w+=B*A,F=j;for(p=0;p<H;p++)F.r=k,F.g=L,F.b=A,F=F.next;v=r;for(p=1;p<=s;p++)m=v+c<<2,y+=(F.r=k=l[m])*(O=H-p),b+=(F.g=L=l[m+1])*O,w+=(F.b=A=l[m+2])*O,T+=k,N+=L,C+=A,F=F.next,p<P&&(v+=r);m=c,q=j,R=I;for(h=0;h<i;h++)d=m<<2,l[d]=y*U>>z,l[d+1]=b*U>>z,l[d+2]=w*U>>z,y-=E,b-=S,w-=x,E-=q.r,S-=q.g,x-=q.b,d=c+((d=h+H)<P?d:P)*r<<2,y+=T+=q.r=l[d],b+=N+=q.g=l[d+1],w+=C+=q.b=l[d+2],q=q.next,E+=k=R.r,S+=L=R.g,x+=A=R.b,T-=k,N-=L,C-=A,R=R.next,m+=r}u.putImageData(a,t,n)}function BlurStack(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];