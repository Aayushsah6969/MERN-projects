import java.swing.*;
import java.awt.event.*;

class Main{
	public static void main(String ar[]){
		Jframe frame = new Jframe("My Title");
		JLable lable = new Jlable("");
		JButton button = new JButton("Click me");
		frame.add(lable);
		frame.add(button);
		button.addActionListener(new ActionListener(){
			public void AddAction(){
				System.out.println("Button Clicked");
				lable.setText("Button is Clicked");
			}
		});
	}
}